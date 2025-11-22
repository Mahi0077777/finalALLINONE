export enum ToolType {
  MERGE = 'merge-pdf',
  SPLIT = 'split-pdf',
  COMPRESS = 'compress-pdf',
  PDF_TO_IMG = 'pdf-to-jpg',
  IMG_TO_PDF = 'jpg-to-pdf',
  ROTATE = 'rotate-pdf',
  PROTECT = 'protect-pdf',
  UNLOCK = 'unlock-pdf',
  NUMBERING = 'page-numbers',
  WATERMARK = 'watermark-pdf'
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolInfo {
  id: ToolType;
  title: string;
  shortTitle: string;
  metaTitle: string; // New for SEO
  metaDescription: string; // New for SEO
  description: string;
  longDescription: string; // HTML content for SEO at bottom of page
  howToSteps: string[]; // For SEO Schema and UI
  icon: string;
  color: string;
  path: string;
  keywords: string[]; // Hidden keywords for internal search/metadata
  faqs: FAQItem[];
  relatedTools?: ToolType[]; // IDs of related tools for cross-selling
}

export interface ProcessedFile {
  name: string;
  data: Uint8Array | Blob;
  mimeType: string;
}

export interface ProcessingOptions {
  // Merge options
  fileOrder?: string[]; // IDs
  // Split options
  splitRange?: string; // e.g., "1-5, 8"
  // Rotate options
  rotationDegrees?: 90 | 180 | 270;
  // Image options
  imageQuality?: number;
  // Protect / Unlock
  password?: string;
  // Watermark
  watermarkText?: string;
}

export type LanguageCode = 
  | 'en' | 'es' | 'hi' | 'pt' | 'ar' | 'de' | 'fr' | 'it' | 'ru' | 'id' 
  | 'vi' | 'ja' | 'ko' | 'zh' | 'th' | 'nl' | 'pl' | 'tr' | 'sv' | 'da';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML string
  date: string;
  author: string;
  category: string;
  coverImage?: string;
  tags: string[];
  relatedToolId: ToolType; // To link back to the tool for conversion
}

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
    confetti: any;
  }
}