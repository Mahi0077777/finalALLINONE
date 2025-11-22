import React from 'react';
import { ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEO 
        title="Privacy Policy - FreePDFPro"
        description="Read the FreePDFPro Privacy Policy. We explain why our client-side technology ensures your documents are never uploaded to any server."
      />
      <div className="text-center mb-12">
        <ShieldCheck className="w-16 h-16 text-brand-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3>1. No File Uploads (Client-Side Processing)</h3>
        <p>
          FreePDFPro operates uniquely compared to other PDF tools. <strong>We do not upload your files to any server.</strong> 
          All processing (Merging, Splitting, Compressing, etc.) happens locally within your web browser using WebAssembly technology. 
          This means your documents never leave your device, ensuring 100% privacy for sensitive data.
        </p>

        <h3>2. Data Collection</h3>
        <p>
          We do not collect, store, or share any personal data or document content. Since there is no backend server storage, 
          it is technically impossible for us to access your files.
        </p>

        <h3>3. Cookies & Third-Party Services</h3>
        <p>
          While we do not use cookies for file processing, we use third-party services like Google AdSense and Google Analytics.
        </p>
        <ul>
          <li><strong>Google AdSense:</strong> Uses cookies to serve ads based on a user's prior visits to this website or other websites.</li>
          <li><strong>Google Analytics:</strong> Used to understand website traffic trends anonymously.</li>
        </ul>

        <h3>4. Advertising</h3>
        <p>
          We use Google AdSense to display advertisements. Google's use of advertising cookies enables it and its partners to serve ads 
          to your users based on their visit to your sites and/or other sites on the Internet. 
          Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="nofollow">Ads Settings</a>.
        </p>

        <h3>5. Changes to This Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We advise you to review this page periodically for any changes.
        </p>
      </div>
    </div>
  );
};

export default Privacy;