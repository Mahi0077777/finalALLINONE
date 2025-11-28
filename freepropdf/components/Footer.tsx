import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">FreeProPDF</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              The #1 Free PDF Tool Suite. 100% Client-side processing means your files never leave your device.
              Secure, Fast, and Free Forever.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/merge-pdf" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">Merge PDF</Link></li>
              <li><Link to="/split-pdf" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">Split PDF</Link></li>
              <li><Link to="/compress-pdf" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">Compress PDF</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Legal & Info</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">Terms of Use</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Massive SEO Internal Link Matrix */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 text-center">Global Reach (International Tools)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {TOOLS.slice(0, 5).map((tool) => (
               <div key={tool.id} className="flex flex-col gap-1">
                 <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 truncate">{tool.shortTitle}</span>
                 {SUPPORTED_LANGUAGES.slice(0, 8).map(lang => (
                   <Link 
                    key={lang.code} 
                    to={`${tool.path}?lang=${lang.code}`}
                    className="text-[10px] text-gray-500 hover:text-brand-600 truncate"
                    title={`${tool.shortTitle} in ${lang.name}`}
                   >
                     {tool.shortTitle} in {lang.name}
                   </Link>
                 ))}
               </div>
             ))}
             {/* Secondary Group */}
             {TOOLS.slice(5, 10).map((tool) => (
               <div key={tool.id} className="flex flex-col gap-1">
                 <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 truncate">{tool.shortTitle}</span>
                 {SUPPORTED_LANGUAGES.slice(0, 8).map(lang => (
                   <Link 
                    key={lang.code} 
                    to={`${tool.path}?lang=${lang.code}`}
                    className="text-[10px] text-gray-500 hover:text-brand-600 truncate"
                    title={`${tool.shortTitle} in ${lang.name}`}
                   >
                     {tool.shortTitle} in {lang.name}
                   </Link>
                 ))}
               </div>
             ))}
          </div>
          <div className="mt-6 text-center">
             <Link to="/all-tools" className="text-xs text-brand-600 hover:underline">View All Supported Languages</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FreeProPDF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;