const fs = require('fs');
const path = require('path');

// Schema templates for different page types
const schemaTemplates = {
  'merge-pdf': {
    breadcrumb: { position: 2, name: 'Merge PDF', url: 'https://freepropdf.com/merge-pdf' },
    howTo: {
      name: 'How to Merge PDF Files Online',
      description: 'Step-by-step guide to merge PDF files using FreeProPDF\'s online merger tool',
      image: 'https://freepropdf.com/images/merge-pdf.jpg',
      totalTime: 'PT3M',
      steps: ['Upload PDF Files', 'Arrange Document Order', 'Merge and Download']
    },
    faq: [
      { question: 'Is merging PDFs free?', answer: 'Yes, our PDF merger is completely free with no hidden charges or watermarks.' },
      { question: 'How many PDFs can I merge?', answer: 'You can merge up to 20 PDF files simultaneously for optimal performance.' },
      { question: 'Is my data secure?', answer: 'Absolutely. All processing happens in your browser with SSL encryption.' }
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

// Priority pages to process first
const priorityPages = [
  'merge-pdf-for-mobile',
  'merge-pdf-for-printing', 
  'merge-pdf-for-resumes',
  'how-to-merge-pdf-files',
  'merge-pdf-online-free',
  'combine-pdf-any-device',
  'merge-large-pdf-files'
];

// Process priority pages
priorityPages.forEach(page => {
  const filePath = path.join(__dirname, `${page}.html`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const pageName = page.replace(/-/g, ' ').replace(/^(.)/, str => str.toUpperCase());
    const pageUrl = `https://freepropdf.com/${page}`;
    
    const schemaMarkup = generateSchemaMarkup('merge-pdf', pageName, pageUrl);
    
    // Replace the closing head tag
    content = content.replace('</style>\n</head>', `</style>\n${schemaMarkup}\n</head>`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Added schema to: ${page}`);
  }
});

console.log('Schema markup added to priority SEO pages!');
