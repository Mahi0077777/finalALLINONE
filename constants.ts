import { ToolInfo, ToolType } from './types';

export const TOOLS: ToolInfo[] = [
  {
    id: ToolType.MERGE,
    title: 'Merge PDF Files',
    shortTitle: 'Merge PDF',
    metaTitle: 'Merge PDF Files Online Free - #1 Private PDF Combiner',
    metaDescription: 'Combine multiple PDF files into one document instantly. 100% Free, Private, and runs in your browser. No uploads, no limits. Try the best PDF Merger now.',
    description: 'The #1 Free PDF Merger. Combine multiple PDFs into one file instantly.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">The Ultimate Guide to Merging PDFs Online</h2>
      <p>In the modern digital workspace, the ability to <strong>merge PDF files</strong> is essential. Whether you are compiling a business report, combining invoices for tax season, or putting together a portfolio, scattered PDF files can be a nightmare to manage. FreeProPDF offers a seamless, secure, and completely free solution to combine your documents.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Why FreeProPDF is the Best Choice in 2025</h3>
      <p>Most online PDF tools require you to upload your private documents to a cloud server. This creates a security risk. FreeProPDF is different. We utilize <strong>WebAssembly</strong> technology to process your files <em>locally</em> on your device.</p>
      
      <div class="my-8 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="min-w-full bg-white dark:bg-gray-800 text-left">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <th class="px-6 py-3 font-bold">Feature</th>
              <th class="px-6 py-3 font-bold text-brand-600">FreeProPDF</th>
              <th class="px-6 py-3 font-bold">Adobe Acrobat Pro</th>
              <th class="px-6 py-3 font-bold">iLovePDF</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td class="px-6 py-4">Price</td>
              <td class="px-6 py-4 font-bold text-green-600">Free Forever</td>
              <td class="px-6 py-4">$19.99/mo</td>
              <td class="px-6 py-4">Freemium</td>
            </tr>
            <tr>
              <td class="px-6 py-4">Privacy (No Uploads)</td>
              <td class="px-6 py-4 font-bold text-green-600">✅ Yes (Client-side)</td>
              <td class="px-6 py-4">❌ No (Cloud)</td>
              <td class="px-6 py-4">❌ No (Cloud)</td>
            </tr>
            <tr>
              <td class="px-6 py-4">Registration</td>
              <td class="px-6 py-4 font-bold text-green-600">Not Required</td>
              <td class="px-6 py-4">Required</td>
              <td class="px-6 py-4">Optional</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-2xl font-bold mt-8 mb-4">How It Works (Technical Deep Dive)</h3>
      <p>When you drag and drop files into our Merge tool, the browser reads the binary data of each PDF. Using the <code>pdf-lib</code> engine, we stitch the page structures together into a new document container. This entire process happens in your computer's RAM. No data packets are sent to our servers, making it physically impossible for us to see your files.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4">Tips for Perfect PDF Merging</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Order Matters:</strong> Use our drag-and-drop interface to arrange files exactly how you want them to appear in the final document.</li>
        <li><strong>File Size:</strong> Since we process locally, you can merge huge files without waiting for uploads.</li>
        <li><strong>Orientation:</strong> Ensure all files are rotated correctly before merging for the best reading experience.</li>
      </ul>
    `,
    howToSteps: [
      "Click 'Select Files' or drag and drop multiple PDF documents into the upload box.",
      "The files will appear in a list. Verify they are the correct files.",
      "Click 'Process PDF' to initiate the client-side merging process.",
      "Wait for the confetti animation, then click 'Download File' to save your combined PDF."
    ],
    icon: 'Files',
    color: 'text-red-500',
    path: '/merge-pdf',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger free', 'combine pdf files online', 'bind pdf', 'pdf binder', 'stitch pdf', 'unify pdf', 'merge documents'],
    faqs: [
      { question: "Is it safe to merge confidential legal documents?", answer: "Yes, absolutely. Unlike other sites, we do not upload your files to any server. The merging happens 100% on your computer, so your data remains private." },
      { question: "Is there a limit on the number of files I can merge?", answer: "No. You can merge as many files as your computer's memory can handle. We do not impose artificial limits." },
      { question: "Do I need to install any software?", answer: "No software installation is required. FreeProPDF works entirely in your web browser (Chrome, Safari, Edge, Firefox)." },
      { question: "Can I merge PDF files on Mac and Windows?", answer: "Yes! Our tool is platform-independent and works on Windows, macOS, Linux, and even mobile devices like iPhone and Android." },
      { question: "Will the quality of my PDF decrease?", answer: "No. We merge the original data streams of your PDF files, preserving their original quality, text vectors, and image resolution." },
      { question: "How long does it take to merge?", answer: "It's almost instant. Because there is no upload or download time for the processing, it is significantly faster than server-based tools." },
      { question: "Can I reorder the files before merging?", answer: "Yes, simply upload your files. (Drag-and-drop reordering is coming in the next update, currently files merge in selection order)." },
      { question: "Does it work offline?", answer: "Yes! If you have installed our PWA or cached the site, you can merge files even without an internet connection." },
      { question: "Is this service really free?", answer: "Yes, FreeProPDF is supported by unobtrusive advertising and is 100% free for all users." },
      { question: "Can I merge password-protected PDFs?", answer: "You will need to unlock them first before merging them." }
    ],
    relatedTools: [ToolType.COMPRESS]
  },
  {
    id: ToolType.SPLIT,
    title: 'Split PDF File',
    shortTitle: 'Split PDF',
    metaTitle: 'Split PDF Online - Extract Pages Free & Privately',
    metaDescription: 'Extract pages from your PDF or split large files into separate documents. Fast, Free, and 100% Client-side privacy.',
    description: 'Extract pages from your PDF or split large files into separate documents.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">How to Split PDF Files Effectively</h2>
      <p>Large PDF documents can be unwieldy. Whether you need to extract a single invoice from a 100-page ledger or separate chapters of an ebook, the <strong>FreeProPDF Split Tool</strong> is the fastest way to do it.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4">Range Extraction Syntax</h3>
      <p>We use a simple but powerful syntax for defining which pages to keep:</p>
      <ul class="list-disc pl-6 space-y-2 my-4">
        <li><strong>Single Pages:</strong> Enter "5" to extract just page 5.</li>
        <li><strong>Ranges:</strong> Enter "1-5" to extract pages 1 through 5.</li>
        <li><strong>Combinations:</strong> Enter "1-5, 8, 10-12" to extract a complex set of pages into a new document.</li>
      </ul>

      <div class="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Pro Tip: Reduce File Size</h4>
        <p class="text-sm text-blue-700 dark:text-blue-400">Splitting a PDF is often the best way to "compress" it if you only need a specific section. By removing unused pages, you drastically reduce the file size.</p>
      </div>

      <h3 class="text-2xl font-bold mt-8 mb-4">Comparison with Desktop Software</h3>
      <p>Why pay $15/month for Adobe Acrobat just to split a file once a month? FreeProPDF offers the same "Extract Pages" functionality for free, without the bloat of installing heavy desktop software.</p>
    `,
    howToSteps: [
      "Upload the PDF file you want to split.",
      "In the configuration box, enter the page range (e.g., '1-5, 8').",
      "Click 'Process PDF' to extract the selected pages.",
      "Download your new, smaller PDF file containing only the content you need."
    ],
    icon: 'Scissors',
    color: 'text-orange-500',
    path: '/split-pdf',
    keywords: ['split pdf', 'extract pdf pages', 'cut pdf', 'separate pdf', 'remove pdf pages', 'pdf splitter', 'divide pdf', 'break pdf', 'pdf page remover'],
    faqs: [
      { question: "How do I extract a single page?", answer: "Simply enter the page number (e.g., '5') in the range input box." },
      { question: "Can I split a file by size?", answer: "Currently we support splitting by page numbers. Size-based splitting is on our roadmap." },
      { question: "Is my document private?", answer: "Yes. The splitting process occurs in your browser memory. We never see your document." },
      { question: "Does this delete the pages from my original file?", answer: "No. Your original file remains untouched on your computer. We create a *new* file with only the pages you selected." },
      { question: "Can I extract pages from multiple files at once?", answer: "Currently, the tool processes one file at a time to ensure maximum accuracy." },
      { question: "What happens to bookmarks/outlines?", answer: "We attempt to preserve content streams, but some advanced bookmarks might be reset depending on the new page structure." },
      { question: "Is there a page limit?", answer: "Technically no, but very large files (500MB+) might be slower depending on your computer's RAM." },
      { question: "Can I split a password protected PDF?", answer: "You must unlock the file first." },
      { question: "Is it free?", answer: "Yes, completely free." },
      { question: "How do I select the last page?", answer: "Check your PDF viewer for the total page count and use that number." }
    ],
    relatedTools: [ToolType.MERGE, ToolType.ROTATE]
  },
  {
    id: ToolType.COMPRESS,
    title: 'Compress PDF',
    shortTitle: 'Compress',
    metaTitle: 'Compress PDF Online - Reduce File Size Free',
    metaDescription: 'Reduce PDF file size instantly without losing quality. Best free PDF compressor for email and web uploads.',
    description: 'Reduce PDF file size while maintaining the best quality. Optimize your documents.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">Reduce PDF File Size Without Quality Loss</h2>
      <p>Sending large PDFs via email is frustrating. Most email providers have a 25MB limit. The <strong>FreeProPDF Compressor</strong> solves this by optimizing the internal structure of your PDF file, removing redundant metadata, and efficiently encoding streams.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4">How Compression Works</h3>
      <p>Our tool analyzes your PDF for:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Redundant Objects:</strong> Removing unused fonts and images.</li>
        <li><strong>Stream Compression:</strong> Applying better algorithms to text data.</li>
        <li><strong>Metadata Cleanup:</strong> Stripping unnecessary edit history.</li>
      </ul>

      <h3 class="text-2xl font-bold mt-8 mb-4">Why Compress Locally?</h3>
      <p>Uploading a 100MB file to a server just to compress it takes time and eats bandwidth. With FreeProPDF, the file is read instantly by your browser, processed, and saved. It's the fastest way to compress PDFs on the web.</p>
    `,
    howToSteps: [
      "Select the large PDF file you need to compress.",
      "The browser will read and analyze the file structure.",
      "Click 'Process PDF' to apply optimization algorithms.",
      "Download the smaller PDF. You will typically see a 20-50% reduction in size."
    ],
    icon: 'Minimize2',
    color: 'text-green-500',
    path: '/compress-pdf',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'optimize pdf', 'pdf compressor online', 'make pdf smaller', 'pdf size reducer', 'email pdf', 'compress document'],
    faqs: [
      { question: "How much will my file size decrease?", answer: "It depends on the file content. Text-heavy PDFs might see 10-20% reduction, while image-heavy PDFs can often be reduced by 50% or more." },
      { question: "Will images look blurry?", answer: "We aim for visually lossless compression. Your images should look virtually identical to the original." },
      { question: "Is it safe for sensitive docs?", answer: "Yes, because the compression happens on your device, not on a cloud server." },
      { question: "Why did my file size not change?", answer: "If your file is already highly optimized or contains already-compressed JPEG images, further compression might not be possible." },
      { question: "Can I compress multiple files?", answer: "Currently we support one file at a time to ensure browser stability." },
      { question: "Do I need an account?", answer: "No, no signup required." },
      { question: "Is there a file size limit?", answer: "We recommend files under 200MB for browser performance, but there is no hard limit." },
      { question: "Does it remove layers?", answer: "It flattens some content to save space, yes." },
      { question: "Can I compress an encrypted PDF?", answer: "No, please unlock it first." },
      { question: "Is this better than Zip?", answer: "Yes, because you don't need to unzip it to view it. It remains a standard PDF." }
    ],
    relatedTools: [ToolType.MERGE]
  },
  {
    id: ToolType.PDF_TO_IMG,
    title: 'PDF to JPG',
    shortTitle: 'PDF to JPG',
    metaTitle: 'Convert PDF to JPG Online High Quality',
    metaDescription: 'Turn PDF pages into high-quality JPG images. Extract images from PDF securely in your browser.',
    description: 'Convert every PDF page into high-quality JPG images. Secure & High Resolution.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">Convert PDF Pages to Images Instantly</h2>
      <p>Sometimes you need a PDF page as an image for a PowerPoint presentation, a social media post, or a website thumbnail. Taking a screenshot is low quality. <strong>FreeProPDF's PDF to JPG converter</strong> renders the page at high resolution and saves it as a clean image file.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">High Fidelity Rendering</h3>
      <p>We use the Mozilla PDF.js engine—the same technology that powers the Firefox PDF viewer—to render your document with pixel-perfect accuracy before converting it to an image format.</p>

      <div class="my-8 border-l-4 border-brand-500 pl-6 py-2 bg-gray-50 dark:bg-gray-800">
        <strong>Feature Update:</strong> We now convert <strong>all pages</strong> of your PDF and package them into a convenient ZIP file for you to download!
      </div>
    `,
    howToSteps: [
      "Upload your PDF document.",
      "The tool renders all pages of the PDF into memory.",
      "Click 'Process PDF' to convert the pages into JPGs and ZIP them.",
      "Download the ZIP file containing all your high-quality images."
    ],
    icon: 'Image',
    color: 'text-yellow-500',
    path: '/pdf-to-jpg',
    keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpg', 'save pdf as picture', 'pdf to png', 'pdf page to image', 'pdf converter'],
    faqs: [
      { question: "What format is the image?", answer: "We output standard JPG files inside a ZIP archive." },
      { question: "What is the resolution?", answer: "We render at a high scale factor (2.0x) to ensure crisp text and sharp images." },
      { question: "Can I convert all pages?", answer: "Yes! We extract every single page of your document." },
      { question: "Is it private?", answer: "Yes, the rendering happens in your browser's canvas element. No server sees the file." },
      { question: "Can I convert JPG back to PDF?", answer: "Yes! Use our JPG to PDF tool for that." },
      { question: "Does it work on mobile?", answer: "Yes, works perfectly on iOS and Android browsers." },
      { question: "Is it free?", answer: "100% Free." },
      { question: "Do I need to install software?", answer: "No." },
      { question: "Why does it look better than a screenshot?", answer: "We render the vector data directly to pixels, avoiding screen scaling artifacts." },
      { question: "Can I use this for Instagram?", answer: "Yes, it's perfect for sharing documents on social media." }
    ],
    relatedTools: [ToolType.IMG_TO_PDF, ToolType.SPLIT]
  },
  {
    id: ToolType.IMG_TO_PDF,
    title: 'JPG to PDF',
    shortTitle: 'JPG to PDF',
    metaTitle: 'Convert Images to PDF - JPG, PNG to PDF Free',
    metaDescription: 'Combine photos, JPGs, and PNGs into a single PDF document. Create portfolios and photo albums instantly.',
    description: 'Convert JPG, PNG, and other images into a PDF document in seconds.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">Turn Images into Professional Documents</h2>
      <p>Have a series of scans or photos that need to be sent as a single document? The <strong>JPG to PDF tool</strong> is the perfect solution. It takes your loose image files and compiles them into a standardized PDF document.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Perfect For:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Receipts & Invoices:</strong> Take photos of your receipts and combine them for expense reports.</li>
        <li><strong>Portfolios:</strong> Combine your design work (PNGs) into a shareable PDF presentation.</li>
        <li><strong>ID Cards:</strong> Merge front and back photos of an ID into one page.</li>
      </ul>
    `,
    howToSteps: [
      "Select one or more images (JPG or PNG).",
      "The tool will load them into the staging area.",
      "Click 'Process PDF' to generate a document.",
      "Download your new PDF containing all your images."
    ],
    icon: 'FileImage',
    color: 'text-pink-500',
    path: '/jpg-to-pdf',
    keywords: ['jpg to pdf', 'png to pdf', 'image to pdf', 'photos to pdf', 'convert image to pdf', 'combine images to pdf', 'make pdf from photos'],
    faqs: [
      { question: "Does it support PNG?", answer: "Yes, we support both JPG and PNG formats." },
      { question: "Can I combine multiple images?", answer: "Yes! You can select multiple files and they will be added as separate pages." },
      { question: "Does it resize my images?", answer: "We fit the image to the PDF page while maintaining aspect ratio." },
      { question: "Is it secure?", answer: "Yes, your photos are processed locally." },
      { question: "What is the page size?", answer: "The PDF pages adapt to the size of your images." },
      { question: "Can I change the order?", answer: "Currently files are added in selection order." },
      { question: "Is there a limit?", answer: "Only your browser memory limit." },
      { question: "Does it work offline?", answer: "Yes, via our PWA capabilities." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Can I add text later?", answer: "You can use our future Edit PDF tool, or just convert to PDF first." }
    ],
    relatedTools: [ToolType.COMPRESS, ToolType.PDF_TO_IMG]
  },
  {
    id: ToolType.ROTATE,
    title: 'Rotate PDF',
    shortTitle: 'Rotate PDF',
    metaTitle: 'Rotate PDF Pages - Fix Orientation Permanently',
    metaDescription: 'Permanently rotate PDF pages 90, 180, or 270 degrees. Save the new orientation instantly.',
    description: 'Permanently rotate your PDF pages. Landscape to Portrait or vice versa.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">Fix Upside-Down PDFs Permanently</h2>
      <p>Scanning documents often results in pages being upside down or sideways. Viewing them is annoying, but sending them to a client looks unprofessional. <strong>FreeProPDF Rotate</strong> allows you to fix the orientation of your document permanently.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Not Just a "View" Change</h3>
      <p>Unlike rotating a page in a PDF viewer (which only affects your current view), this tool modifies the file's metadata. When you save and share the file, it will open in the correct orientation for everyone.</p>
    `,
    howToSteps: [
      "Upload the PDF with incorrect orientation.",
      "Choose the rotation angle (90, 180, or 270 degrees).",
      "Click 'Process PDF' to apply the rotation matrix to the pages.",
      "Download the fixed PDF file."
    ],
    icon: 'RotateCw',
    color: 'text-purple-500',
    path: '/rotate-pdf',
    keywords: ['rotate pdf', 'turn pdf', 'fix pdf orientation', 'rotate pdf pages permanent', 'flip pdf', 'change pdf direction'],
    faqs: [
      { question: "Does this rotate all pages?", answer: "Yes, the selected rotation is applied to all pages in the document." },
      { question: "Is the change permanent?", answer: "Yes. The downloaded file will open correctly on any device." },
      { question: "Can I rotate individual pages?", answer: "Currently we rotate the whole document. Page-specific rotation is coming soon." },
      { question: "Does it affect file size?", answer: "Negligible impact on file size." },
      { question: "Is it safe?", answer: "Yes, processed locally." },
      { question: "Can I rotate 90 degrees left?", answer: "Yes, simply choose 270 degrees (which is 90 degrees counter-clockwise)." },
      { question: "Does it work on scans?", answer: "Yes, works on any PDF." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Can I rotate multiple files?", answer: "One file at a time currently." },
      { question: "Does it lower quality?", answer: "No, it simply updates the rotation flag in the PDF code." }
    ],
    relatedTools: [ToolType.MERGE, ToolType.NUMBERING]
  },
  {
    id: ToolType.NUMBERING,
    title: 'Page Numbers',
    shortTitle: 'Page Numbers',
    metaTitle: 'Add Page Numbers to PDF Online Free',
    metaDescription: 'Insert page numbers into PDF documents. Professional pagination for legal documents and reports.',
    description: 'Add page numbers to your PDF files with ease. Organize your documents.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">Organize Your Documents Professionally</h2>
      <p>Submitting a thesis, legal contract, or manuscript without page numbers is unprofessional and risky. If pages get mixed up, the document loses its integrity. <strong>FreeProPDF Pagination</strong> inserts clear, readable page numbers at the bottom of every page.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Automatic Calculation</h3>
      <p>You don't need to manually type numbers. Our tool reads the total page count and inserts "1 / 10", "2 / 10", etc., ensuring perfect accuracy even for massive documents.</p>
    `,
    howToSteps: [
      "Upload the document that needs numbering.",
      "The tool automatically calculates page counts.",
      "Click 'Process PDF' to stamp numbers at the bottom center.",
      "Download your organized document."
    ],
    icon: 'Hash',
    color: 'text-cyan-500',
    path: '/page-numbers',
    keywords: ['add page numbers', 'paginate pdf', 'number pdf pages', 'page numbering', 'pdf pagination', 'bates numbering'],
    faqs: [
      { question: "Where are numbers placed?", answer: "Bottom center of the page." },
      { question: "Can I change the font?", answer: "Currently we use a standard Helvetica font for maximum readability." },
      { question: "Does it overwrite text?", answer: "The numbers are placed in the margin. If your text goes to the very edge, it might overlap, but for standard documents, it fits perfectly." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Can I start from page 5?", answer: "Currently it starts numbering from the first page of the file." },
      { question: "Does it work on scanned PDFs?", answer: "Yes, it adds a text layer on top of the scan." },
      { question: "Is it reversible?", answer: "The numbers become part of the PDF content. You would need a PDF editor to delete them later." },
      { question: "Does it work on 500+ page files?", answer: "Yes, it handles large files easily." },
      { question: "Is it watermarked?", answer: "No, only the page numbers are added." },
      { question: "Is it secure?", answer: "Yes, local processing." }
    ],
    relatedTools: [ToolType.WATERMARK, ToolType.ROTATE]
  },
  {
    id: ToolType.WATERMARK,
    title: 'Watermark PDF',
    shortTitle: 'Watermark',
    metaTitle: 'Watermark PDF Online - Add Text Stamp Free',
    metaDescription: 'Add custom watermarks to PDF documents. Protect intellectual property with "Confidential" or "Draft" stamps.',
    description: 'Stamp text over your PDF. Custom typography, transparency, and position.',
    longDescription: `
      <h2 class="text-3xl font-bold mt-8 mb-4">Protect Your Intellectual Property</h2>
      <p>Whether you are sharing a screenplay draft, a confidential price list, or a design mockup, adding a <strong>Watermark</strong> is crucial. It prevents people from passing off your work as their own and clearly signals the status of the document (e.g., "DRAFT" or "CONFIDENTIAL").</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Customizable Protection</h3>
      <p>Our tool adds a semi-transparent text layer over your content. It is placed diagonally across the center of the page, ensuring it is visible but doesn't make the document unreadable.</p>
    `,
    howToSteps: [
      "Upload your PDF.",
      "Type your watermark text (e.g., 'CONFIDENTIAL').",
      "Click 'Process PDF' to apply the watermark diagonally across all pages.",
      "Download your stamped document."
    ],
    icon: 'Stamp',
    color: 'text-red-400',
    path: '/watermark-pdf',
    keywords: ['watermark pdf', 'add watermark', 'pdf stamp', 'copyright pdf', 'confidential stamp pdf', 'mark pdf'],
    faqs: [
      { question: "Can I remove the watermark?", answer: "Watermarks are permanent additions to the file. Removing them requires advanced editing software." },
      { question: "Can I use an image?", answer: "Currently we support text watermarks. Image watermarking is coming soon." },
      { question: "Is it transparent?", answer: "Yes, we apply opacity so the underlying text is still readable." },
      { question: "Is it free?", answer: "Yes." },
      { question: "Does it apply to all pages?", answer: "Yes." },
      { question: "Can I change the color?", answer: "It defaults to a professional gray/watermark color." },
      { question: "Is it secure?", answer: "Yes, local processing." },
      { question: "Does it work on big files?", answer: "Yes." },
      { question: "Can I customize the font?", answer: "It uses a standard bold font for clarity." },
      { question: "Does it work on mobile?", answer: "Yes." }
    ],
    relatedTools: [ToolType.NUMBERING]
  }
];

export const SEO_CONTENT = {
  heroTitle: "The #1 Free PDF Tool Suite",
  heroSubtitle: "Merge, Split, Compress & Convert PDFs. 100% Private. No Uploads. No Sign-up.",
  features: [
    { title: "100% Private & Secure", desc: "We process your files locally using WebAssembly. No server uploads means your data never leaves your device." },
    { title: "Lightning Fast", desc: "Zero upload time. Zero download time. Instant processing directly in your browser." },
    { title: "Completely Free", desc: "No hidden costs, no watermarks, no registration required. Just pure PDF utility." }
  ]
};