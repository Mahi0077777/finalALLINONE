import React from 'react';
import { FileCheck } from 'lucide-react';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEO 
        title="Terms of Use - FreeProPDF"
        description="Terms of Service for using FreeProPDF's online PDF tools."
      />
      <div className="text-center mb-12">
        <FileCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Use</h1>
      </div>

      <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing and using FreeProPDF, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h3>2. Description of Service</h3>
        <p>
          FreeProPDF provides free online PDF tools. The service is provided "as is" and "as available". 
          We modify files locally in your browser.
        </p>

        <h3>3. Limitation of Liability</h3>
        <p>
          In no event shall FreeProPDF be liable for any damages (including, without limitation, damages for loss of data or profit) 
          arising out of the use or inability to use the tools on this site. 
          <strong>Always keep a backup of your original files.</strong>
        </p>

        <h3>4. User Conduct</h3>
        <p>
          You agree not to use these tools for any illegal purposes, including manipulating copyright-protected documents 
          without authorization.
        </p>
      </div>
    </div>
  );
};

export default Terms;