import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = "https://freepdfpro.com/og-image.jpg", 
  ogType = "website",
  keywords,
  schema 
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const domain = "https://freepdfpro.com";
  const currentPath = location.pathname;
  const currentUrl = canonicalUrl || `${domain}/#${currentPath}`;

  const cleanTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const cleanDesc = description.length > 155 ? `${description.substring(0, 152)}...` : description;

  useEffect(() => {
    document.title = cleanTitle;

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) el.setAttribute('property', property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="title"]', cleanTitle);
    setMeta('meta[name="description"]', cleanDesc);
    if (keywords && keywords.length > 0) {
      setMeta('meta[name="keywords"]', keywords.join(', '));
    }
    setMeta('meta[name="language"]', language);

    setMeta('meta[property="og:url"]', currentUrl);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:title"]', cleanTitle);
    setMeta('meta[property="og:description"]', cleanDesc);
    setMeta('meta[property="og:image"]', ogImage);

    setMeta('meta[property="twitter:url"]', currentUrl);
    setMeta('meta[property="twitter:title"]', cleanTitle);
    setMeta('meta[property="twitter:description"]', cleanDesc);
    setMeta('meta[property="twitter:image"]', ogImage);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // Inject hreflang tags for all 20 languages
    SUPPORTED_LANGUAGES.forEach(lang => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang.code}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang.code);
        document.head.appendChild(link);
      }
      // In a real router, we might have /es/merge-pdf. Here we use hash routing param logic conceptually
      // For now, pointing to main domain as it's a SPA
      link.setAttribute('href', `${domain}/#${currentPath}?lang=${lang.code}`);
    });

    const scriptId = 'dynamic-json-ld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    if (schema) {
      script.text = JSON.stringify(schema);
    } else {
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "FreePDFPro",
        "url": domain,
        "inLanguage": language
      });
    }

  }, [cleanTitle, cleanDesc, currentUrl, ogImage, ogType, keywords, schema, language, currentPath]);

  return null;
};

export default SEO;