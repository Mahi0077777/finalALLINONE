const fs = require('fs');
const path = require('path');

// Function to move internal links to first paragraph
function optimizeInternalLinks(content, pageUrl) {
  // Find the intro paragraph
  const introMatch = content.match(/<p class="intro">(.*?)<\/p>/s);
  if (!introMatch) return content;
  
  // Find all internal links in the content
  const linkRegex = /<a href="\/[^"]*" class="text-brand-600 hover:text-brand-700 font-semibold">([^<]*?)<\/a>/g;
  const allLinks = content.match(linkRegex) || [];
  
  if (allLinks.length === 0) return content;
  
  // Remove all internal links from content
  let optimizedContent = content.replace(linkRegex, '');
  
  // Add internal links to the intro paragraph
  const introText = introMatch[1];
  const optimizedIntro = introText.replace(/\.$/, ` Use our <a href="${pageUrl}" class="text-brand-600 hover:text-brand-700 font-semibold">${pageUrl.split('/').pop().replace(/-/g, ' ').replace(/^(.)/, str => str.toUpperCase())}</a> to optimize PDFs for web use while maintaining professional quality. <a href="${pageUrl}" class="text-brand-600 hover:text-brand-700 font-semibold">${pageUrl.split('/').pop().replace(/-/g, ' ').replace(/^(.)/, str => str.toUpperCase())} now</a>.</p>`);
  
  // Replace the intro paragraph in the content
  optimizedContent = content.replace(introMatch[0], optimizedIntro);
  
  return optimizedContent;
}

// Get all SEO pages
const seoPages = [
  // Compress PDF pages
  'compress-pdf-file-size',
  'compress-pdf-for-web',
  'compress-pdf-without-losing-quality',
  'compress-scanned-pdf-files',
  'reduce-pdf-size-for-email',
  
  // PDF to JPG pages
  'convert-pdf-to-jpg-online',
  'pdf-to-jpg-multiple-pages',
  'pdf-to-jpg-for-web-and-social',
  'extract-images-from-pdf-to-jpg',
  'pdf-to-jpg-from-scanned-documents',
  
  // JPG to PDF pages
  'convert-jpg-to-pdf-online',
  'jpg-to-pdf-multiple-images',
  'jpg-to-pdf-scanned-documents',
  'jpg-to-pdf-for-email-and-sharing',
  'organize-photos-and-notes-with-jpg-to-pdf',
  
  // Rotate PDF pages
  'rotate-pdf-online-free',
  'rotate-pdf-for-exams-and-forms',
  'rotate-pdf-for-presentations',
  'rotate-pdf-for-photos',
  'rotate-pdf-for-printing',
  'rotate-pdf-on-mobile',
  'rotate-scanned-pdf-documents',
  'rotate-pdf-for-technical-drawings',
  'rotate-pdf-offline-vs-online',
  'fix-sideways-pdf-pages',
  
  // Split PDF pages
  'split-pdf-online-guide',
  'split-large-pdf-files',
  'split-pdf-by-pages-or-chapters',
  'split-pdf-for-email',
  'split-scanned-and-legal-pdf-documents',
  
  // Page Numbers pages
  'add-page-numbers-to-pdf',
  'page-numbers-for-academic-papers',
  'page-numbers-for-books',
  'page-numbers-for-invoices',
  'page-numbers-for-legal-documents',
  'page-numbers-for-manuals',
  'page-numbers-for-reports',
  'custom-page-numbering-pdf',
  'remove-page-numbers-from-pdf',
  'bates-numbering-pdf',
  
  // Watermark PDF pages
  'add-watermark-to-pdf',
  'copyright-watermark-pdf',
  'confidential-watermark-pdf',
  'draft-watermark-pdf',
  'logo-watermark-pdf',
  'remove-watermark-from-pdf',
  'text-watermark-pdf',
  'batch-watermark-pdf',
  'transparent-watermark-pdf',
  'diagonal-watermark-pdf',
  'custom-watermark-pdf',
  'sample-watermark-pdf'
];

// Process each page
seoPages.forEach(page => {
  const filePath = path.join(__dirname, `${page}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get the page URL for internal links
    const pageUrl = `https://freepropdf.com/${page}`;
    
    // Optimize internal links
    const optimizedContent = optimizeInternalLinks(content, pageUrl);
    
    // Write back the optimized content
    fs.writeFileSync(filePath, optimizedContent);
    console.log(`✅ Optimized internal links for: ${page}`);
  }
});

console.log('🚀 Internal link optimization complete!');
console.log('📊 All internal links moved to first paragraph for maximum visibility!');
