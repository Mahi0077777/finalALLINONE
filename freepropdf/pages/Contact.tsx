import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEO 
        title="Contact FreeProPDF - Support & Inquiries"
        description="Contact the FreeProPDF team for support, bug reports, or partnership inquiries. Email us directly for assistance."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact FreeProPDF",
          "url": "https://freepropdf.com/#/contact",
          "mainEntity": {
             "@type": "Organization",
             "name": "FreeProPDF",
             "email": "er.mahendramali@gmail.com"
          }
        }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have a question, bug report, or feature suggestion? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-full text-brand-600 mb-6">
            <Mail size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Email Support</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            For general inquiries, partnership opportunities, or technical support, please write an email to:
          </p>
          <a 
            href="mailto:er.mahendramali@gmail.com" 
            className="text-xl font-bold text-brand-600 dark:text-brand-400 hover:underline break-all"
          >
            er.mahendramali@gmail.com
          </a>
        </div>

        {/* Developer Info / Social */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full text-purple-600 mb-6">
            <MessageSquare size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Feedback</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Found a bug or have a cool idea for a new PDF tool? Let us know! We are constantly improving FreeProPDF based on user feedback.
          </p>
          <span className="text-sm text-gray-500 font-medium px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            Response time: Usually within 24 hours
          </span>
        </div>
      </div>

      <div className="mt-16 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About the Developer</h3>
        <p className="text-gray-600 dark:text-gray-400">
          FreeProPDF is built and maintained by <strong>Mahendra Mali</strong>. 
          <br />
          Contact directly: <a href="mailto:er.mahendramali@gmail.com" className="text-brand-600 hover:underline">er.mahendramali@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;