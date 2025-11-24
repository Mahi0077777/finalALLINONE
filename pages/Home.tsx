import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS, SEO_CONTENT } from '../constants';
import * as Icons from 'lucide-react';
import { Check, X, Star, Quote, DollarSign, Shield, Zap, Download } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const [counter, setCounter] = useState(14520);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTools = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('tools');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const TESTIMONIALS = [
    {
      name: "Sarah Jenkins",
      role: "Freelance Designer",
      text: "I used to pay $20/month for Adobe Acrobat just to combine files. FreePDFPro does it instantly for free. The offline mode is a lifesaver.",
      stars: 5
    },
    {
      name: "David Chen",
      role: "Student",
      text: "Best site for handling my thesis papers. I love that I don't have to upload my personal documents to some random server.",
      stars: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Small Business Owner",
      text: "Fast, clean, and actually free. The 'Merge PDF' tool saves me so much time with invoices every week.",
      stars: 5
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      <SEO 
        title={`${t('heroTitle')} - FreePDFPro`}
        description={t('heroSubtitle')}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FreePDFPro",
          "url": "https://freepdfpro.com",
          "applicationCategory": "Productivity",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
        keywords={["free pdf tools", "merge pdf", "split pdf"]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-brand-50/80 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
           <div className="absolute top-20 left-20 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-bold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            {counter.toLocaleString()} {t('processedToday')}
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-brand-600 dark:text-brand-400 mb-4 animate-fade-in-up">
            {t('privacyBadge')}
          </p>
          
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
               href="#tools" 
               onClick={scrollToTools}
               className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 cursor-pointer"
             >
               {t('getStarted')}
             </a>
             <Link to="/merge-pdf" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
               {t('mergeNow')}
             </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TOOLS.map((tool) => {
            const IconComponent = (Icons as any)[tool.icon] || Icons.FileQuestion;
            return (
              <Link 
                key={tool.id} 
                to={tool.path}
                className="group relative block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className={`mb-6 inline-block p-4 rounded-2xl bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-8 w-8 ${tool.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {tool.description}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-400 to-brand-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stop Overpaying for PDF Tools</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400">See why smart users are switching to FreePDFPro.</p>
        </div>
        
        <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl mt-8">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-3 sm:p-6 text-left text-gray-500 dark:text-gray-400 font-medium w-1/2">Feature</th>
                  <th className="p-3 sm:p-6 text-center text-brand-600 dark:text-brand-400 font-bold text-lg bg-brand-50 dark:bg-brand-900/20 w-1/2">FreePDFPro</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {/* Price */}
                <tr>
                  <td className="p-3 sm:p-6 font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                        <span className="bg-green-100 dark:bg-green-900 p-1 rounded text-green-600 shrink-0"><DollarSign size={16}/></span> 
                        <span>Price</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-6 text-center font-bold text-green-600 bg-brand-50/30 dark:bg-brand-900/10">$0 (Free Forever)</td>
                </tr>
                {/* Privacy */}
                <tr>
                  <td className="p-3 sm:p-6 font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded text-blue-600 shrink-0"><Shield size={16}/></span> 
                        <span>Privacy (No Uploads)</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-6 text-center bg-brand-50/30 dark:bg-brand-900/10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-green-600 font-bold">
                        <Check size={20} strokeWidth={3} className="shrink-0" /> 
                        <span className="text-center">100% Private</span>
                    </div>
                  </td>
                </tr>
                 {/* Registration */}
                 <tr>
                  <td className="p-3 sm:p-6 font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                        <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded text-purple-600 shrink-0"><Zap size={16}/></span> 
                        <span>Registration</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-6 text-center bg-brand-50/30 dark:bg-brand-900/10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-green-600 font-bold">
                        <Check size={20} strokeWidth={3} className="shrink-0" /> 
                        <span className="text-center">No Sign-up</span>
                    </div>
                  </td>
                </tr>
                 {/* Offline */}
                 <tr>
                  <td className="p-3 sm:p-6 font-medium text-gray-900 dark:text-white">Works Offline</td>
                  <td className="p-3 sm:p-6 text-center bg-brand-50/30 dark:bg-brand-900/10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-green-600 font-bold">
                        <Check size={20} strokeWidth={3} className="shrink-0" /> 
                        <span className="text-center">Yes (PWA)</span>
                    </div>
                  </td>
                </tr>
                 {/* Installation */}
                 <tr>
                  <td className="p-3 sm:p-6 font-medium text-gray-900 dark:text-white">Installation</td>
                  <td className="p-3 sm:p-6 text-center bg-brand-50/30 dark:bg-brand-900/10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-green-600 font-bold">
                        <Check size={20} strokeWidth={3} className="shrink-0" /> 
                        <span className="text-center">No Install</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-800 py-20 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Trusted by <span className="text-brand-600">10,000+</span> Users
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              See why people are switching to FreePDFPro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl relative hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <Quote className="absolute top-6 right-6 text-brand-200 dark:text-brand-900 h-12 w-12 rotate-180" />
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(item.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 relative z-10">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;