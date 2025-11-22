import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { getTranslation } from '../i18n/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [searchParams, setSearchParams] = useSearchParams();

  // Load saved language, URL language, or detect browser language
  useEffect(() => {
    // 1. Check URL param first (High Priority for SEO links)
    const urlLang = searchParams.get('lang') as LanguageCode;
    if (urlLang && SUPPORTED_LANGUAGES.some(l => l.code === urlLang)) {
      setLanguageState(urlLang);
      // Persist to local storage
      localStorage.setItem('language', urlLang);
      return;
    }

    // 2. Check Local Storage
    const saved = localStorage.getItem('language') as LanguageCode;
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      setLanguageState(saved);
    } else {
      // 3. Check Browser Language
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, [searchParams]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction for RTL support
    const dir = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    
    // Update URL without reloading to keep SEO clean if user manually switches
    setSearchParams(prev => {
      prev.set('lang', lang);
      return prev;
    });
  };

  const t = (key: string) => {
    return getTranslation(language, key as any);
  };

  const currentDir = SUPPORTED_LANGUAGES.find(l => l.code === language)?.dir || 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: currentDir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};