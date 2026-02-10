const fs = require('fs');
const path = require('path');

// Function to add main tool links to first paragraph
function addMainToolLinks(content, pageName, mainToolUrl, toolName) {
  // Find the intro paragraph
  const introMatch = content.match(/<p class="intro">(.*?)<\/p>/s);
  if (!introMatch) return content;
  
  const introText = introMatch[1];
  
  // Check if main tool link already exists
  if (introText.includes(mainToolUrl)) {
    console.log(`✅ ${pageName} already has main tool link`);
    return content;
  }
  
  // Add main tool links at the beginning of the intro paragraph
  const optimizedIntro = introText.replace(/^/, `Use our <a href="${mainToolUrl}" class="text-brand-600 hover:text-brand-700 font-semibold">${toolName}</a> to optimize your PDFs quickly and easily. <a href="${mainToolUrl}" class="text-brand-600 hover:text-brand-700 font-semibold">${toolName} now</a>. `);
  
  // Replace the intro paragraph in the content
  const optimizedContent = content.replace(introMatch[0], `<p class="intro">${optimizedIntro}</p>`);
  
  console.log(`🔧 Added main tool links to: ${pageName}`);
  return optimizedContent;
}

// Define page categories and their main tool URLs
const pageCategories = {
  'merge-pdf': {
    url: '/merge-pdf',
    name: 'PDF merger',
    pages: [
      'merge-large-pdf-files',
      'combine-pdf-any-device', 
      'how-to-merge-pdf-files',
      'merge-pdf-for-business',
      'merge-pdf-online-free',
      'merge-pdf-for-educational-materials',
      'merge-pdf-for-forms',
      'merge-pdf-for-legal-documents',
      'merge-pdf-for-mobile',
      'merge-pdf-for-printing',
      'merge-pdf-for-resumes'
    ]
  },
  'split-pdf': {
    url: '/split-pdf',
    name: 'PDF splitter',
    pages: [
      'split-pdf-online-guide',
      'split-large-pdf-files',
      'split-pdf-by-pages-or-chapters',
      'split-pdf-for-email',
      'split-scanned-and-legal-pdf-documents'
    ]
  },
  'compress-pdf': {
    url: '/compress-pdf',
    name: 'PDF compressor',
    pages: [
      'compress-pdf-file-size',
      'compress-pdf-for-web',
      'compress-pdf-without-losing-quality',
      'compress-scanned-pdf-files',
      'reduce-pdf-size-for-email'
    ]
  },
  'pdf-to-jpg': {
    url: '/pdf-to-jpg',
    name: 'PDF to JPG converter',
    pages: [
      'convert-pdf-to-jpg-online',
      'pdf-to-jpg-multiple-pages',
      'pdf-to-jpg-for-web-and-social',
      'extract-images-from-pdf-to-jpg',
      'pdf-to-jpg-from-scanned-documents'
    ]
  },
  'jpg-to-pdf': {
    url: '/jpg-to-pdf',
    name: 'JPG to PDF converter',
    pages: [
      'convert-jpg-to-pdf-online',
      'jpg-to-pdf-multiple-images',
      'jpg-to-pdf-scanned-documents',
      'jpg-to-pdf-for-email-and-sharing',
      'organize-photos-and-notes-with-jpg-to-pdf'
    ]
  },
  'rotate-pdf': {
    url: '/rotate-pdf',
    name: 'PDF rotator',
    pages: [
      'rotate-pdf-online-free',
      'rotate-pdf-on-mobile',
      'rotate-pdf-offline-vs-online',
      'rotate-pdf-for-technical-drawings',
      'rotate-pdf-for-printing',
      'rotate-pdf-for-presentations',
      'rotate-pdf-for-photos',
      'rotate-pdf-for-exams-and-forms',
      'rotate-scanned-pdf-documents',
      'fix-sideways-pdf-pages'
    ]
  },
  'page-numbers': {
    url: '/page-numbers',
    name: 'PDF page numberer',
    pages: [
      'add-page-numbers-to-pdf',
      'page-numbers-for-academic-papers',
      'page-numbers-for-books',
      'page-numbers-for-invoices',
      'page-numbers-for-legal-documents',
      'page-numbers-for-manuals',
      'page-numbers-for-reports',
      'custom-page-numbering-pdf',
      'remove-page-numbers-from-pdf',
      'bates-numbering-pdf'
    ]
  },
  'watermark-pdf': {
    url: '/watermark-pdf',
    name: 'PDF watermark tool',
    pages: [
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
    ]
  }
};

// Track modified pages
const modifiedPages = [];

// Process each category
Object.entries(pageCategories).forEach(([category, config]) => {
  console.log(`\n🔍 Processing ${category} pages...`);
  
  config.pages.forEach(page => {
    const filePath = path.join(__dirname, `${page}.html`);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Add main tool links
      const optimizedContent = addMainToolLinks(content, page, config.url, config.name);
      
      // Write back the optimized content
      if (optimizedContent !== content) {
        fs.writeFileSync(filePath, optimizedContent);
        modifiedPages.push(page);
      }
    } else {
      console.log(`❌ File not found: ${page}.html`);
    }
  });
});

console.log('\n🚀 Main tool link addition complete!');
console.log('📊 All SEO pages now have main tool links in first paragraph!');
console.log('\n📝 Modified Pages:');
modifiedPages.forEach(page => console.log(`  ✅ ${page}.html`));
