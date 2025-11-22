import React from 'react';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEO 
        title="About FreePDFPro - Secure Client-Side PDF Tools"
        description="Learn about FreePDFPro's mission to provide free, private, and fast PDF tools running entirely in your browser using WebAssembly."
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About FreePDFPro",
          "url": "https://freepdfpro.com/#/about",
          "mainEntity": {
             "@type": "Organization",
             "name": "FreePDFPro",
             "slogan": "All PDF tools. Free. Fast. No uploads. 100% private."
          }
        }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About FreePDFPro</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our mission is to make PDF editing free, fast, and privacy-focused for everyone.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why We Built This</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Most online PDF tools require you to upload your sensitive documents to a remote server. 
          We believe you shouldn't have to trade your privacy for convenience. 
          FreePDFPro was built using modern WebAssembly technology to run powerful PDF processing engines directly in your web browser.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 mb-3">
              <CheckCircle />
            </div>
            <h3 className="font-bold">Privacy First</h3>
            <p className="text-sm text-gray-500">No server uploads. Ever.</p>
          </div>
           <div className="flex flex-col items-center text-center p-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 mb-3">
              <CheckCircle />
            </div>
            <h3 className="font-bold">Always Free</h3>
            <p className="text-sm text-gray-500">No hidden paywalls.</p>
          </div>
           <div className="flex flex-col items-center text-center p-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 mb-3">
              <CheckCircle />
            </div>
            <h3 className="font-bold">Lightning Fast</h3>
            <p className="text-sm text-gray-500">No upload/download wait times.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;