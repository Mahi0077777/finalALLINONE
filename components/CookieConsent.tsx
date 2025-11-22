import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-bold">We use cookies</span> to analyze traffic and personalize content. 
          Since our tools run client-side, we do not store your files. 
          By using our site, you acknowledge our <a href="/#/privacy" className="underline text-brand-600">Privacy Policy</a>.
        </div>
        <div className="flex gap-3">
          <button 
            onClick={accept}
            className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-brand-500/20"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;