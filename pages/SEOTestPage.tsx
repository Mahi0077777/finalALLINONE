import React from 'react';
import { SEOTest } from '../components/SEOTest';
import { ToolType } from '../types';

const SEOTestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SEO Test Page</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Meta Tags</h2>
        <p>Check the browser console for detailed meta tag information.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Home Page</h3>
              <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Test Home Page
              </a>
            </div>
            {Object.values(ToolType).map((tool) => (
              <div key={tool}>
                <h3 className="font-medium">{tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
                <a href={`/${tool}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Test {tool} Page
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Validation Tools</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Google Rich Results Test</h3>
              <a 
                href="https://search.google.com/test/rich-results" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Test with Google
              </a>
            </div>
            <div>
              <h3 className="font-medium">Schema Markup Validator</h3>
              <a 
                href="https://validator.schema.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Validate Schema.org Markup
              </a>
            </div>
            <div>
              <h3 className="font-medium">hreflang Tester</h3>
              <a 
                href="https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Test hreflang Implementation
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEOTest component will log all meta tags to console */}
      <SEOTest />
    </div>
  );
};

export default SEOTestPage;
