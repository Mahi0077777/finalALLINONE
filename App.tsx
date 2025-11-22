import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { TOOLS } from './constants';
import { ToolType } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import CookieConsent from './components/CookieConsent';
import Loading from './components/Loading';
import { trackPageView } from './services/analytics';

// Lazy Load Pages for Ultra-Fast Initial Load (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const ToolProcessor = lazy(() => import('./components/ToolProcessor'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Tracking Wrapper
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <Router>
      <PageTracker />
      <LanguageProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
          <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
          
          <main className="flex-grow">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                {/* Dynamic Routes for Tools */}
                {TOOLS.map((tool) => (
                  <Route 
                    key={tool.id}
                    path={tool.path}
                    element={
                      <ToolProcessor 
                        toolType={tool.id}
                        title={tool.title}
                        description={tool.description}
                        accept={
                          tool.id === ToolType.IMG_TO_PDF 
                            ? "image/jpeg, image/png, image/jpg" 
                            : "application/pdf"
                        }
                        multiple={
                          [ToolType.MERGE, ToolType.IMG_TO_PDF].includes(tool.id)
                        }
                      />
                    }
                  />
                ))}

                <Route path="/all-tools" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          
          <CookieConsent />
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;