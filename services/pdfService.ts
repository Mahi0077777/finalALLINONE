import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import JSZip from 'jszip';
import { ProcessedFile } from '../types';

// Initialize PDF.js worker
// Using unpkg with .mjs extension for v5+ compatibility
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

/**
 * Merge multiple PDFs into one
 */
export const mergePDFs = async (files: File[]): Promise<ProcessedFile> => {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  return {
    name: `merged-document-${Date.now()}.pdf`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};

/**
 * Compress PDF (Client-Side)
 * Implements "Rasterize & Downsample" strategy:
 * 1. Renders pages to Canvas using PDF.js at lower resolution
 * 2. Converts Canvas to JPEG
 * 3. Rebuilds PDF from images
 */
export const compressPDF = async (files: File[], quality: number = 0.6): Promise<ProcessedFile> => {
  if (files.length === 0) throw new Error("No file provided");
  const file = files[0];
  const arrayBuffer = await file.arrayBuffer();
  const originalSize = arrayBuffer.byteLength;
  
  // Load using PDF.js to render images
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const originalPdf = await loadingTask.promise;
  
  const newPdf = await PDFDocument.create();
  const totalPages = originalPdf.numPages;

  // Determine Scale based on quality preference
  // 1.0 = 72 DPI (Standard Screen) - Good for High Quality
  // 0.8 = ~57 DPI (Good for email)
  // 0.6 = ~43 DPI (Extreme compression)
  let viewportScale = 0.8; 
  if (quality <= 0.4) viewportScale = 0.6;
  if (quality >= 0.8) viewportScale = 1.0;
  
  for (let i = 1; i <= totalPages; i++) {
    try {
      const page = await originalPdf.getPage(i);
      const viewport = page.getViewport({ scale: viewportScale }); 
      
      const canvas = document.createElement('canvas');
      // Use integer dimensions to avoid browser bugs
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      // alpha: false saves memory and improves performance for standard PDFs
      const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
      
      if (!context) {
        continue;
      }
      
      // Render page to canvas
      // Cast to any to avoid type mismatch where RenderParameters expects 'canvas' property
      await page.render({ canvasContext: context, viewport } as any).promise;
      
      // Convert to JPEG with specified quality
      const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/jpeg', quality));
      
      if (blob) {
         const buffer = await blob.arrayBuffer();
         const embeddedImage = await newPdf.embedJpg(buffer);
         const newPage = newPdf.addPage([viewport.width, viewport.height]);
         newPage.drawImage(embeddedImage, {
           x: 0, y: 0, width: viewport.width, height: viewport.height
         });
      }

      // Explicitly clear canvas to help GC
      canvas.width = 0;
      canvas.height = 0;
    } catch (e) {
      console.warn(`Error compressing page ${i}, skipping optimization for this page.`);
    }
  }
  
  // Save with optimization
  const pdfBytes = await newPdf.save();
  
  // FAILSAFE: If the "compressed" file is larger than original (common with text-only PDFs),
  // return the original file to avoid "increasing" the size.
  if (pdfBytes.byteLength >= originalSize) {
     return {
        name: `compressed-${file.name}`,
        data: new Uint8Array(arrayBuffer),
        mimeType: 'application/pdf',
     };
  }
  
  return {
    name: `compressed-${file.name}`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};

/**
 * Split PDF (Extract specific pages or range)
 */
export const splitPDF = async (file: File, rangeStr: string): Promise<ProcessedFile> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();
  const totalPages = pdfDoc.getPageCount();

  // Basic parsing of "1-3, 5" -> [0, 1, 2, 4] (zero-indexed)
  const pageIndices: number[] = [];
  const parts = rangeStr.split(',');
  
  parts.forEach(part => {
    const cleanPart = part.trim();
    if (cleanPart.includes('-')) {
      const [start, end] = cleanPart.split('-').map(n => parseInt(n));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i > 0 && i <= totalPages) pageIndices.push(i - 1);
        }
      }
    } else {
      const num = parseInt(cleanPart);
      if (!isNaN(num) && num > 0 && num <= totalPages) {
        pageIndices.push(num - 1);
      }
    }
  });

  const uniqueIndices = [...new Set(pageIndices)].sort((a, b) => a - b);

  if (uniqueIndices.length === 0) {
    uniqueIndices.push(0);
  }

  const copiedPages = await newPdf.copyPages(pdfDoc, uniqueIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  return {
    name: `split-${file.name}`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};

/**
 * Convert Images to PDF
 */
export const imagesToPDF = async (files: File[]): Promise<ProcessedFile> => {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      continue; 
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return {
    name: `images-combined-${Date.now()}.pdf`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};

/**
 * Rotate PDF Pages
 */
export const rotatePDF = async (file: File, rotation: 90 | 180 | 270): Promise<ProcessedFile> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + rotation));
  });

  const pdfBytes = await pdfDoc.save();
  return {
    name: `rotated-${file.name}`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};

/**
 * Convert PDF to Images (All pages to ZIP)
 */
export const pdfToImage = async (file: File): Promise<ProcessedFile> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;
  
  // Initialize JSZip
  const zip = new JSZip();
  const folder = zip.folder("images");
  
  const scale = 2.0; // High quality

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) continue;

    canvas.height = Math.floor(viewport.height);
    canvas.width = Math.floor(viewport.width);

    await page.render({ canvasContext: context, viewport } as any).promise;

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.95);
    });

    if (blob) {
      zip.file(`page-${i}.jpg`, blob);
    }
    
    canvas.width = 0;
    canvas.height = 0;
  }

  const content = await zip.generateAsync({ type: 'blob' });

  return {
    name: `${file.name.replace('.pdf', '')}-images.zip`,
    data: content,
    mimeType: 'application/zip',
  };
};

/**
 * Add Watermark
 */
export const watermarkPDF = async (file: File, text: string): Promise<ProcessedFile> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const fontSize = 50;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    
    page.drawText(text, {
      x: (width / 2) - (textWidth / 2) - 20, 
      y: height / 2,
      size: fontSize,
      font: font,
      color: rgb(0.7, 0.7, 0.7),
      opacity: 0.4,
      rotate: degrees(45),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return {
    name: `watermarked-${file.name}`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};

/**
 * Add Page Numbers
 */
export const addPageNumbers = async (file: File): Promise<ProcessedFile> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;

  pages.forEach((page, idx) => {
    const { width } = page.getSize();
    const text = `${idx + 1} / ${totalPages}`;
    const fontSize = 12;
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    page.drawText(text, {
      x: (width / 2) - (textWidth / 2),
      y: 20, // Bottom margin
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return {
    name: `numbered-${file.name}`,
    data: pdfBytes,
    mimeType: 'application/pdf',
  };
};