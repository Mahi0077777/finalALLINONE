import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { useLanguage } from '../contexts/LanguageContext';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  schema?: object | object[];
  toolType?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  keywords = [],
  schema,
  toolType
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const domain = 'https://freepropdf.com';
  const currentPath = location.pathname;
  const currentUrl = canonicalUrl || `${domain}${currentPath}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${domain}${ogImage}`;

  // Clean and truncate title and description for SEO
  const cleanTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const cleanDesc = description.length > 155 ? `${description.substring(0, 152)}...` : description;
  const cleanKeywords = Array.isArray(keywords) ? keywords.join(', ') : '';

  useEffect(() => {
    // Set document title
    document.title = cleanTitle;

    // Helper function to set or update meta tags
    const setMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        } else if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) element.setAttribute('property', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
      return element;
    };

    // Set meta title
    setMeta('meta[name="title"]', cleanTitle);

    // Set meta description
    setMeta('meta[name="description"]', cleanDesc);

    // Set OpenGraph tags
    setMeta('meta[property="og:title"]', cleanTitle);
    setMeta('meta[property="og:description"]', cleanDesc);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:url"]', currentUrl);
    setMeta('meta[property="og:image"]', fullOgImage);
    setMeta('meta[property="og:site_name"]', 'FreeProPDF');
    setMeta('meta[property="og:locale"]', language || 'en');

    // Set Twitter Card tags
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', cleanTitle);
    setMeta('meta[name="twitter:description"]', cleanDesc);
    setMeta('meta[name="twitter:image"]', fullOgImage);

    // Set viewport for mobile
    setMeta('meta[name="viewport"]', 'width=device-width, initial-scale=1.0');

    // Set theme color
    setMeta('meta[name="theme-color"]', '#4f46e5');

    // Set keywords if provided
    if (cleanKeywords) {
      setMeta('meta[name="keywords"]', cleanKeywords);
    }

    // Set canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = currentUrl;

    // Set hreflang for all supported languages
    SUPPORTED_LANGUAGES.forEach(({ code }) => {
      let hreflang = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`) as HTMLLinkElement;
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.rel = 'alternate';
        hreflang.hrefLang = code;
        document.head.appendChild(hreflang);
      }
      hreflang.href = `${domain}/${code}${currentPath}`;
    });

    // Add JSON-LD schema
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    // Generate schema based on tool type
    const generateSchema = () => {
      const baseSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": cleanTitle,
        "description": cleanDesc,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": currentUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "FreeProPDF",
          "logo": {
            "@type": "ImageObject",
            "url": `${domain}/logo.png`
          }
        }
      };

      // Add FAQ schema if available
      if (toolType && TOOLS.find(t => t.id === toolType)?.faqs?.length) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": TOOLS.find(t => t.id === toolType)?.faqs?.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };
        return [baseSchema, faqSchema];
      }

      return baseSchema;
    };

    // Use provided schema or generate one
    const finalSchema = schema || generateSchema();
    script.text = JSON.stringify(finalSchema);

    // Cleanup function to remove dynamically added elements
    return () => {
      // Clean up any dynamically added elements if needed
    };
  }, [cleanTitle, cleanDesc, currentUrl, ogType, fullOgImage, cleanKeywords, language, toolType]);

  return null;
};

export default SEO;