const fs = require('fs');
const path = require('path');

// Template file path
const templatePath = path.join(__dirname, 'public', '_template.html');

// Directory containing HTML files
const publicDir = path.join(__dirname, 'public');

// Read the template
const template = fs.readFileSync(templatePath, 'utf8');

// List of pages to update with their metadata
const pages = [
  {
    file: 'merge-large-pdf-files.html',
    title: 'Best Practices for Merging Large PDF Documents',
    description: 'Learn expert techniques for merging large PDF files efficiently while maintaining quality. Discover how to handle large documents with our free online tools.',
    keywords: 'merge large pdf, combine big pdf files, pdf merger for large files, optimize pdf merging, handle large documents',
    canonical: 'merge-large-pdf-files'
  },
  {
    file: 'combine-pdf-any-device.html',
    title: 'How to Combine PDF Files on Any Device',
    description: 'Learn how to merge PDF files on any device - iPhone, Android, Windows, or Mac. Our responsive PDF combiner works perfectly across all platforms.',
    keywords: 'merge pdf on phone, combine pdf mobile, pdf merger for all devices, cross-platform pdf tool, merge pdf online mobile',
    canonical: 'combine-pdf-any-device'
  },
  {
    file: 'how-to-merge-pdf-files.html',
    title: 'How to Merge PDF Files - Complete Guide',
    description: 'Step-by-step guide on how to merge PDF files online for free. Combine multiple PDFs into one document quickly and easily with our secure tool.',
    keywords: 'how to merge pdf, combine pdf files, merge pdf online, join pdf documents, pdf merger guide',
    canonical: 'how-to-merge-pdf-files'
  },
  {
    file: 'merge-pdf-for-business.html',
    title: 'Merge PDFs for Business: A Complete Guide',
    description: 'Discover how businesses can efficiently merge PDFs for reports, contracts, and presentations. Learn about secure, batch processing for professional document management.',
    keywords: 'business pdf merger, merge pdf for work, professional pdf tools, document management, batch pdf processing',
    canonical: 'merge-pdf-for-business'
  },
  {
    file: 'merge-pdf-online-free.html',
    title: 'Merge PDF Online Free - No Watermark or Registration',
    description: 'Merge PDF files online for free with no watermarks, registration, or file size limits. Combine multiple PDFs into one document quickly and securely.',
    keywords: 'merge pdf free, combine pdf no watermark, online pdf merger, merge pdf no registration, free pdf joiner',
    canonical: 'merge-pdf-online-free'
  }
];

// Function to update a single page
function updatePage(page) {
  const filePath = path.join(publicDir, page.file);
  
  // Read the existing content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract the main content (between <body> tags)
  const bodyContentMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyContentMatch) {
    console.error(`Could not find body content in ${page.file}`);
    return;
  }
  
  const bodyContent = bodyContentMatch[1]
    .replace(/<main[^>]*>([\s\S]*?)<\/main>/i, '$1') // Remove existing main tag if any
    .trim();
  
  // Create the new content using the template
  let newContent = template
    .replace('{%TITLE%}', page.title)
    .replace('{%DESCRIPTION%}', page.description)
    .replace('{%KEYWORDS%}', page.keywords)
    .replace('{%CANONICAL%}', page.canonical)
    .replace('{%CONTENT%}', `
      <article class="prose mx-auto py-8">
        <div class="max-w-4xl mx-auto">
          ${bodyContent}
        </div>
      </article>
    `);
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${page.file}`);
}

// Update all pages
pages.forEach(updatePage);

console.log('All pages have been updated with the new template!');
