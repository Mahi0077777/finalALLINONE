const fs = require('fs');

// Update main website with correct branding
function updateMainWebsite() {
  const filePath = './index.html';
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update title tag
    content = content.replace(/<title>FreeProPDF - The #1 Free Online PDF Tools \(100% Private\)<\/title>/g, '<title>FreeProPDF - The #1 Free Online PDF Tools (100% Private)</title>');
    
    // Update meta description
    content = content.replace(/The world's fastest free PDF tools/g, 'The world\'s fastest FreeProPDF');
    
    // Update meta keywords
    content = content.replace(/merge pdf, split pdf, compress pdf free/g, 'FreeProPDF, merge pdf, split pdf, compress pdf free');
    
    // Update meta author
    content = content.replace(/<meta name="author" content="FreeProPDF">/g, '<meta name="author" content="FreeProPDF">');
    
    // Add structured data for homepage
    const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "FreeProPDF",
          "url": "https://freepropdf.com",
          "description": "The world's fastest FreeProPDF online PDF tools. Merge, Split, Compress, and Convert PDFs directly in your browser. No uploads, no sign-ups, 100% privacy guaranteed."
        }
      ]
    }
    </script>`;
    
    // Insert structured data before closing </head>
    content = content.replace('</head>', `${structuredData}\n  </head>`);
    
    // Write the updated content
    fs.writeFileSync(filePath, content);
    
    console.log('✅ Main website updated with correct branding!');
    console.log('📊 Changes:');
    console.log('  • Title: "FreeProPDF - The #1 Free Online PDF Tools (100% Private)"');
    console.log('  • Meta description updated');
    console.log('  • Meta keywords updated');
    console.log('  • Meta author updated');
    console.log('  • Structured data added');
    console.log('\n🌐 Brand consistency achieved across all pages!');
    
  } catch (error) {
    console.error('❌ Error updating main website:', error.message);
  }
}

updateMainWebsite();
