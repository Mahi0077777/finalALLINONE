import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEOTest: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('=== Current Meta Tags ===');
    console.log('Title:', document.title);
    
    // Log all meta tags
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
      const meta = metas[i];
      const name = meta.getAttribute('name');
      const property = meta.getAttribute('property');
      const content = meta.getAttribute('content');
      
      if (name || property) {
        console.log(
          name ? `name="${name}"` : `property="${property}"`,
          ':',
          content
        );
      }
    }
    
    // Log canonical and hreflang
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.rel === 'canonical' || link.rel === 'alternate') {
        console.log(`<link rel="${link.rel}" ${link.hreflang ? `hreflang="${link.hreflang}"` : ''} href="${link.href}">`);
      }
    }
    
    // Log JSON-LD schemas
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach((script, i) => {
      try {
        console.log(`Schema #${i + 1}:`, JSON.parse(script.textContent || '{}'));
      } catch (e) {
        console.error('Error parsing schema:', e);
      }
    });
    
  }, [location.pathname]);
  
  return null;
};

export default SEOTest;
