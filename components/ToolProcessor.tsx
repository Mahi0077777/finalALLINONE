import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, ArrowRight, CheckCircle, XCircle, Loader2, RefreshCw, Download, Share2, Star, DollarSign, ChevronRight, Home, Trash2, ArrowUp, ArrowDown, Plus, GripVertical } from 'lucide-react';
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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  // Config State
  const [splitRange, setSplitRange] = useState<string>("1");
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [watermarkText, setWatermarkText] = useState<string>("CONFIDENTIAL");
  const [compressionQuality, setCompressionQuality] = useState<number>(0.6); // Default to recommended

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = TOOLS.find(t => t.id === toolType);
    setToolInfo(t);
    
    // Reset all state when switching tools to prevent UI glitches
    setFiles([]);
    setStep(1);
    setResult(null);
    setError(null);
    setSplitRange("1");
    setRotation(90);
    setWatermarkText("CONFIDENTIAL");
    setCompressionQuality(0.6);
    setDraggedIndex(null);
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

  const handleAddMoreInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files, true);
    }
  };

  const handleFiles = (fileList: FileList, append: boolean = false) => {
    setError(null);
    const validFiles = Array.from(fileList);
    
    if (!multiple && (validFiles.length > 1 || (append && files.length >= 1))) {
      setError("This tool only supports one file at a time.");
      return;
    }
    
    setFiles(prev => append ? [...prev, ...validFiles] : validFiles);
    setStep(2);
    trackEvent(append ? 'add_more_files' : 'upload_files', 'Tool', toolType, validFiles.length);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setStep(1);
    }
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  // Drag and Drop Reordering Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (!multiple) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Necessary for onDrop to work
    if (draggedIndex === null || draggedIndex === index) return;
  };

  const handleDropReorder = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFiles = [...files];
    const draggedItem = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedItem);
    
    setFiles(newFiles);
    setDraggedIndex(null);
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
      // Slight artificial delay for UX
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
        case ToolType.NUMBERING:
           processed = await PDFService.addPageNumbers(files[0]);
           break;
        case ToolType.COMPRESS:
           processed = await PDFService.compressPDF(files, compressionQuality);
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
      title: `FreeProPDF - ${title}`,
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
  };

  const renderFileList = () => {
    if (files.length === 0) return null;

    const isMergeOrImg = [ToolType.MERGE, ToolType.IMG_TO_PDF].includes(toolType);

    return (
      <div className="w-full max-w-2xl mb-8">
        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Selected Files ({files.length})
        </h4>
        <div className="space-y-3">
          {files.map((file, idx) => (
            <div 
              key={`${file.name}-${idx}`} 
              className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4 transition-all ${draggedIndex === idx ? 'opacity-50 border-dashed border-brand-400' : ''} ${isMergeOrImg ? 'cursor-move' : ''}`}
              draggable={isMergeOrImg}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDropReorder(e, idx)}
              onDragEnd={() => setDraggedIndex(null)}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                {isMergeOrImg && (
                  <div className="text-gray-300 cursor-grab active:cursor-grabbing">
                    <GripVertical size={20} />
                  </div>
                )}
                <div className="bg-brand-50 dark:bg-brand-900/20 p-2 rounded-lg text-brand-600 dark:text-brand-400">
                  {file.type.includes('image') ? <Icons.Image size={20} /> : <Icons.FileText size={20} />}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate" title={file.name}>{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                </div>
              </div>
              
              {isMergeOrImg ? (
                <div className="flex items-center gap-1">
                   <button 
                    onClick={() => moveFile(idx, -1)} 
                    disabled={idx === 0}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500 disabled:opacity-30"
                    title="Move Up"
                   >
                     <ArrowUp size={18} />
                   </button>
                   <button 
                    onClick={() => moveFile(idx, 1)} 
                    disabled={idx === files.length - 1}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500 disabled:opacity-30"
                    title="Move Down"
                   >
                     <ArrowDown size={18} />
                   </button>
                   <button 
                    onClick={() => removeFile(idx)}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded ml-2"
                    title="Remove File"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
              ) : (
                <button 
                  onClick={() => removeFile(idx)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors"
                >
                  <XCircle size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {isMergeOrImg && (
          <div className="mt-4 flex justify-center">
             <button 
              onClick={() => addMoreInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 rounded-lg transition-colors border border-brand-200 dark:border-brand-800"
             >
               <Plus size={16} /> Add More Files
             </button>
             <input 
               ref={addMoreInputRef} 
               type="file" 
               className="hidden" 
               accept={accept} 
               multiple 
               onChange={handleAddMoreInput} 
             />
          </div>
        )}
      </div>
    );
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
      case ToolType.COMPRESS:
        return (
          <div className="w-full max-w-md">
             <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">Compression Level</label>
             <div className="grid grid-cols-1 gap-3">
               {[
                 { label: "Recommended (Good Quality)", val: 0.6, desc: "~40% Size Reduction" },
                 { label: "Extreme (Low Quality)", val: 0.3, desc: "~70% Size Reduction" }
               ].map((opt) => (
                 <button
                   key={opt.val}
                   onClick={() => setCompressionQuality(opt.val)}
                   className={`p-4 rounded-xl border text-left transition-all ${
                     compressionQuality === opt.val 
                     ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 ring-1 ring-brand-500' 
                     : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-300'
                   }`}
                 >
                   <div className="flex items-center justify-between">
                     <span className={`font-bold ${compressionQuality === opt.val ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-200'}`}>
                       {opt.label}
                     </span>
                     {compressionQuality === opt.val && <CheckCircle size={18} className="text-brand-600" />}
                   </div>
                   <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
                 </button>
               ))}
             </div>
          </div>
        );
      default:
         return <p className="text-gray-600 dark:text-gray-300 font-medium">Ready to process {files.length} file(s).</p>;
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
          "item": "https://freepropdf.com"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": toolInfo.title,
          "item": `https://freepropdf.com/#${toolInfo.path}`
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
  
  // Calculate size reduction percentage if available
  const resultSize = result 
    ? (result.data instanceof Blob ? result.data.size : result.data.byteLength) 
    : 0;

  const reduction = result && files.length > 0 && toolType === ToolType.COMPRESS
  ? Math.round((1 - (resultSize / files.reduce((acc, f) => acc + f.size, 0))) * 100)
  : 0;

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

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-xl flex items-center gap-3 max-w-2xl w-full animate-bounce">
          <XCircle size={24} />
          <span className="font-medium">{error}</span>
        </div>
      )}

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
              {/* File List Rendered Here */}
              {renderFileList()}

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

            {toolType === ToolType.COMPRESS && (
               <>
                {reduction > 0 ? (
                    <div className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 rounded-full font-bold text-sm">
                        Reduced by {reduction}%
                    </div>
                ) : (
                    <div className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-4 py-2 rounded-full font-bold text-sm">
                        File already optimized
                    </div>
                )}
               </>
            )}

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