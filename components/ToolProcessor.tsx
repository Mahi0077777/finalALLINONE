import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, ArrowRight, CheckCircle, XCircle, Loader2, RefreshCw, Download, Share2, Star, ShieldCheck, Globe, DollarSign, Sparkles, ChevronRight, Home } from 'lucide-react';
import { ToolType, ProcessedFile, ToolInfo } from '../types';
import { TOOLS } from '../constants';
import * as PDFService from '../services/pdfService';
import * as Icons from 'lucide-react';
import SEO from './SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../services/analytics';

interface ToolProcessorProps {
  toolType: ToolType;
  title: string;
  description: string;
  accept: string;
  multiple: boolean;
}

declare global {
  interface Window {
    confetti: any;
  }
}

const ToolProcessor: React.FC<ToolProcessorProps> = ({ toolType, title, description, accept, multiple }) => {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedFile | null>(null);
  const [toolInfo, setToolInfo] = useState<ToolInfo | undefined>(undefined);
  
  // Config State
  const [splitRange, setSplitRange] = useState<string>("1");
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [password, setPassword] = useState<string>("");
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = TOOLS.find(t => t.id === toolType);
    setToolInfo(t);
  }, [toolType]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [multiple]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    setError(null);
    const validFiles = Array.from(fileList);
    
    if (!multiple && validFiles.length > 1) {
      setError("This tool only supports one file at a time.");
      return;
    }
    
    setFiles(validFiles);
    setStep(2);
    trackEvent('upload_files', 'Tool', toolType, validFiles.length);
  };

  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#f59e0b', '#3b82f6']
      });
    }
  };

  const processFiles = async () => {
    setStep(3);
    setError(null);

    try {
      let processed: ProcessedFile | null = null;
      await new Promise(r => setTimeout(r, 1000));

      switch (toolType) {
        case ToolType.MERGE:
          processed = await PDFService.mergePDFs(files);
          break;
        case ToolType.SPLIT:
          processed = await PDFService.splitPDF(files[0], splitRange);
          break;
        case ToolType.IMG_TO_PDF:
          processed = await PDFService.imagesToPDF(files);
          break;
        case ToolType.PDF_TO_IMG:
           processed = await PDFService.pdfToImage(files[0]);
           break;
        case ToolType.ROTATE:
           processed = await PDFService.rotatePDF(files[0], rotation);
           break;
        case ToolType.WATERMARK:
           processed = await PDFService.watermarkPDF(files[0], watermarkText);
           break;
        case ToolType.PROTECT:
           if (!password) throw new Error("Password is required");
           processed = await PDFService.protectPDF(files[0], password);
           break;
        case ToolType.UNLOCK:
           processed = await PDFService.unlockPDF(files[0], password);
           break;
        case ToolType.NUMBERING:
           processed = await PDFService.addPageNumbers(files[0]);
           break;
        case ToolType.COMPRESS:
           processed = await PDFService.mergePDFs(files);
           processed.name = `compressed-${files[0].name}`;
           break;
        default:
          throw new Error("Tool not implemented yet");
      }

      setResult(processed);
      setStep(4);
      trackEvent('process_success', 'Tool', toolType);
      setTimeout(triggerConfetti, 300);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please check if the file is valid.");
      setStep(2);
      trackEvent('process_error', 'Tool', toolType);
    }
  };

  const downloadFile = () => {
    if (!result) return;
    const blob = new Blob([result.data], { type: result.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackEvent('download', 'Tool', toolType);
  };

  const handleShare = async () => {
    const shareData = {
      title: `FreePDFPro - ${title}`,
      text: t('moneySaved'),
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent('share_native', 'Viral', toolType);
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('copyLink') + " Copied!");
      trackEvent('share_copy_link', 'Viral', toolType);
    }
  };

  const reset = () => {
    setFiles([]);
    setStep(1);
    setResult(null);
    setError(null);
    setSplitRange("1");
    setPassword("");
  };

  const renderConfig = () => {
    switch (toolType) {
      case ToolType.SPLIT:
        return (
          <div className="w-full max-w-md">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Page Ranges</label>
            <input 
              type="text" 
              value={splitRange} 
              onChange={(e) => setSplitRange(e.target.value)}
              placeholder="e.g., 1-5, 8"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        );
      case ToolType.ROTATE:
        return (
           <div className="flex gap-4">
             {[90, 180, 270].map((deg) => (
               <button
                key={deg}
                onClick={() => setRotation(deg as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${rotation === deg ? 'bg-brand-600 text-white shadow-lg scale-105' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50'}`}
               >
                 {deg}°
               </button>
             ))}
           </div>
        );
      case ToolType.PROTECT:
      case ToolType.UNLOCK:
        return (
          <div className="w-full max-w-md">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        );
      case ToolType.WATERMARK:
        return (
          <div className="w-full max-w-md">
             <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">Text</label>
            <input 
              type="text" 
              value={watermarkText} 
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        );
      default:
         return <p className="text-gray-600 dark:text-gray-300 font-medium">{t('ready')} {files.length} file(s).</p>;
    }
  };

  const getSchema = () => {
    if (!toolInfo) return null;
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://freepdfpro.com"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": toolInfo.title,
          "item": `https://freepdfpro.com/#${toolInfo.path}`
        }]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": toolInfo.title,
        "inLanguage": language,
        "applicationCategory": "Productivity"
      }
    ];
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      
      {toolInfo && (
        <SEO 
          title={`${toolInfo.metaTitle} (${language.toUpperCase()})`}
          description={toolInfo.metaDescription}
          keywords={toolInfo.keywords}
          schema={getSchema() || {}}
        />
      )}

      <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400 w-full max-w-4xl">
        <Link to="/" className="hover:text-brand-600 flex items-center gap-1 transition-colors">
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-gray-900 dark:text-white truncate">{title}</span>
      </nav>

      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">{title}</h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 min-h-[500px] flex flex-col relative">
        
        {/* STEP 1: UPLOAD */}
        {step === 1 && (
          <div 
            className={`flex-1 flex flex-col items-center justify-center p-12 border-4 border-dashed transition-all duration-200 m-4 rounded-2xl cursor-pointer ${
              isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-200 dark:border-gray-700 hover:border-brand-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="bg-brand-100 dark:bg-brand-900/50 p-6 rounded-full mb-6 pointer-events-none">
              <Upload className="h-12 w-12 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 pointer-events-none">
              {t('upload')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center pointer-events-none">
              {t('uploadText')}
            </p>
            <span className="relative flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-sm border border-gray-200 dark:border-gray-600">
              <Upload size={20}/> {t('selectFiles')}
            </span>
            <input ref={fileInputRef} type="file" className="hidden" accept={accept} multiple={multiple} onChange={handleFileInput} />
          </div>
        )}

        {/* STEP 2: CONFIG */}
        {step === 2 && (
          <div className="flex-1 flex flex-col p-8">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                 <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-bold">{t('step2')}</span>
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('configure')}</h3>
              </div>
              <button onClick={reset} className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1">
                <XCircle size={16} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center gap-8">
              <div className="w-full flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                {renderConfig()}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={processFiles} className="flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-xl">
                {t('process')} <ArrowRight size={24}/>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <Loader2 className="h-20 w-20 text-brand-600 animate-spin mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Processing...</h3>
          </div>
        )}

        {/* STEP 4: DOWNLOAD */}
        {step === 4 && result && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-gradient-to-b from-transparent to-green-50/30 dark:to-green-900/5">
            <div className="bg-green-100 dark:bg-green-800 p-5 rounded-full mb-6 animate-bounce-slow">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{t('ready')}</h3>
            
            <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 px-6 py-3 rounded-full flex items-center gap-2 animate-pulse-slow">
               <DollarSign size={18} className="text-yellow-600 dark:text-yellow-400" />
               <span className="text-yellow-800 dark:text-yellow-200 font-bold text-sm">
                 {t('moneySaved')}
               </span>
            </div>

            <div className="flex flex-col w-full max-w-sm gap-4">
              <button onClick={downloadFile} className="w-full flex justify-center items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg">
                <Download size={22} /> {t('download')}
              </button>
              
              <button onClick={reset} className="w-full flex justify-center items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-50">
                <RefreshCw size={20} /> {t('processAnother')}
              </button>
            </div>
            
            <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full max-w-lg text-center">
               <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center justify-center gap-2">
                 <Star size={14} className="text-yellow-400 fill-current" /> 
                 {t('share')}
               </p>
               <div className="flex justify-center gap-4 flex-wrap">
                 <button 
                   className="flex items-center gap-2 px-6 py-3 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-xl text-sm font-bold hover:bg-brand-200 transition-colors w-full sm:w-auto justify-center" 
                   onClick={handleShare}
                 >
                   <Share2 size={16} /> {t('share')}
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO CONTENT SECTION */}
      {toolInfo && (
        <div className="mt-24 w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: toolInfo.longDescription }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolProcessor;