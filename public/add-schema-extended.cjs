const fs = require('fs');
const path = require('path');

// Extended schema templates for all categories
const schemaTemplates = {
  'split-pdf': {
    breadcrumb: { position: 2, name: 'Split PDF', url: 'https://freepropdf.com/split-pdf' },
    howTo: {
      name: 'How to Split PDF Files',
      description: 'Step-by-step guide to split PDF files using FreeProPDF\'s online splitter tool',
      image: 'https://freepropdf.com/images/split-pdf.jpg',
      totalTime: 'PT2M',
      steps: ['Upload PDF File', 'Choose Split Method', 'Download Split Pages']
    },
    faq: [
      { question: 'Can I split specific pages?', answer: 'Yes, you can select exact pages or page ranges to split from your PDF.' },
      { question: 'Will splitting reduce quality?', answer: 'No, our splitter maintains original quality of all pages.' },
      { question: 'Can I split by bookmarks?', answer: 'Yes, you can split PDF files by bookmark sections for organized separation.' }
    ]
  },
  'compress-pdf': {
    breadcrumb: { position: 2, name: 'Compress PDF', url: 'https://freepropdf.com/compress-pdf' },
    howTo: {
      name: 'How to Compress PDF Files',
      description: 'Step-by-step guide to compress PDF files using FreeProPDF\'s online compression tool',
      image: 'https://freepropdf.com/images/compress-pdf.jpg',
      totalTime: 'PT2M',
      steps: ['Upload PDF Files', 'Choose Compression Level', 'Download Compressed PDF']
    },
    faq: [
      { question: 'Will compression affect quality?', answer: 'Our smart compression maintains visual quality while reducing file size significantly.' },
      { question: 'How much can I reduce file size?', answer: 'Typically 40-70% reduction depending on content type and compression settings.' },
      { question: 'Is compression safe for sensitive documents?', answer: 'Yes, all processing is secure and files are automatically deleted after 1 hour.' }
    ]
  },
  'pdf-to-jpg': {
    breadcrumb: { position: 2, name: 'PDF to JPG', url: 'https://freepropdf.com/pdf-to-jpg' },
    howTo: {
      name: 'How to Convert PDF to JPG',
      description: 'Step-by-step guide to convert PDF files to JPG images using FreeProPDF\'s online converter',
      image: 'https://freepropdf.com/images/pdf-to-jpg.jpg',
      totalTime: 'PT2M',
      steps: ['Upload PDF Files', 'Choose Image Quality', 'Download JPG Images']
    },
    faq: [
      { question: 'Can I convert all pages to JPG?', answer: 'Yes, you can convert all PDF pages or select specific pages to convert.' },
      { question: 'What image quality should I choose?', answer: 'For web use, choose 72 DPI. For print, select 300 DPI for best results.' },
      { question: 'Will conversion preserve text quality?', answer: 'Yes, our converter maintains crisp text quality at any resolution setting.' }
    ]
  },
  'rotate-pdf': {
    breadcrumb: { position: 2, name: 'Rotate PDF', url: 'https://freepropdf.com/rotate-pdf' },
    howTo: {
      name: 'How to Rotate PDF Pages',
      description: 'Step-by-step guide to rotate PDF pages using FreeProPDF\'s online rotation tool',
      image: 'https://freepropdf.com/images/rotate-pdf.jpg',
      totalTime: 'PT1M',
      steps: ['Upload PDF Files', 'Select Pages to Rotate', 'Choose Rotation Angle', 'Download Rotated PDF']
    },
    faq: [
      { question: 'Can I rotate specific pages?', answer: 'Yes, you can select individual pages or rotate all pages at once.' },
      { question: 'What rotation angles are available?', answer: 'You can rotate pages by 90, 180, or 270 degrees, or use custom angles.' },
      { question: 'Will rotation affect quality?', answer: 'No, our rotation maintains original quality and formatting of all pages.' }
    ]
  },
  'page-numbers': {
    breadcrumb: { position: 2, name: 'Page Numbers', url: 'https://freepropdf.com/page-numbers' },
    howTo: {
      name: 'How to Add Page Numbers to PDF',
      description: 'Step-by-step guide to add page numbers to PDF files using FreeProPDF\'s online numbering tool',
      image: 'https://freepropdf.com/images/page-numbers.jpg',
      totalTime: 'PT3M',
      steps: ['Upload PDF Files', 'Choose Numbering Style', 'Set Position and Format', 'Download Numbered PDF']
    },
    faq: [
      { question: 'Can I number specific pages?', answer: 'Yes, you can add page numbers to all pages or select specific page ranges.' },
      { question: 'What numbering styles are available?', answer: 'Choose from Arabic numerals, Roman numerals, or custom formats with different positions.' },
      { question: 'Will numbering affect document content?', answer: 'No, page numbers are added as non-intrusive overlays preserving all content.' }
    ]
  },
  'watermark-pdf': {
    breadcrumb: { position: 2, name: 'Watermark PDF', url: 'https://freepropdf.com/watermark-pdf' },
    howTo: {
      name: 'How to Add Watermarks to PDF',
      description: 'Step-by-step guide to add watermarks to PDF files using FreeProPDF\'s online watermark tool',
      image: 'https://freepropdf.com/images/watermark-pdf.jpg',
      totalTime: 'PT3M',
      steps: ['Upload PDF Files', 'Choose Watermark Type', 'Customize Design and Text', 'Download Watermarked PDF']
    },
    faq: [
      { question: 'Can I add custom watermarks?', answer: 'Yes, create custom text, logo, or image watermarks with full control over position and transparency.' },
      { question: 'Will watermarks affect document quality?', answer: 'No, our watermarks are added as transparent overlays preserving document quality.' },
      { question: 'Can I batch watermark multiple PDFs?', answer: 'Yes, our batch processing allows you to watermark multiple PDF files efficiently.' }
    ]
  }
};

// Function to generate schema markup
function generateSchemaMarkup(pageType, pageName, pageUrl) {
  const template = schemaTemplates[pageType];
  if (!template) return '';
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://freepropdf.com/"
          },
          template.breadcrumb,
          {
            "@type": "ListItem",
            "position": 3,
            "name": pageName,
            "item": pageUrl
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": template.howTo.name,
        "description": template.howTo.description,
        "image": template.howTo.image,
        "totalTime": template.howTo.totalTime,
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "PDF files"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": "FreeProPDF"
          }
        ],
        "step": template.howTo.steps.map((step, index) => ({
          "@type": "HowToStep",
          "name": step,
          "text": step
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": template.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };
  
  return `    <!-- Schema Markup for SEO -->
    <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
    </script>`;
}

// Extended list of pages to process
const extendedPages = [
  // Split PDF pages
  'split-pdf-online-guide',
  'split-large-pdf-files',
  'split-pdf-by-pages-or-chapters',
  'split-pdf-for-email',
  'split-scanned-and-legal-pdf-documents',
  
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

// Process extended pages
extendedPages.forEach(page => {
  const filePath = path.join(__dirname, `${page}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine page type and generate appropriate schema
    let pageType = 'merge-pdf'; // default
    let pageName = page.replace(/-/g, ' ').replace(/^(.)/, str => str.toUpperCase());
    let pageUrl = `https://freepropdf.com/${page}`;
    
    if (page.includes('split-pdf')) pageType = 'split-pdf';
    else if (page.includes('compress-pdf')) pageType = 'compress-pdf';
    else if (page.includes('pdf-to-jpg')) pageType = 'pdf-to-jpg';
    else if (page.includes('jpg-to-pdf')) pageType = 'jpg-to-pdf';
    else if (page.includes('rotate-pdf')) pageType = 'rotate-pdf';
    else if (page.includes('page-numbers')) pageType = 'page-numbers';
    else if (page.includes('watermark-pdf')) pageType = 'watermark-pdf';
    
    const schemaMarkup = generateSchemaMarkup(pageType, pageName, pageUrl);
    
    // Replace the closing head tag
    content = content.replace('</style>\n</head>', `</style>\n${schemaMarkup}\n</head>`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Added schema to: ${page}`);
  }
});

console.log('Schema markup added to all extended SEO pages!');
