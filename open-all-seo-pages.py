#!/usr/bin/env python3
import webbrowser
import time
import os

# List of all SEO pages
seo_pages = [
  # Merge PDF Category (11 pages)
  'merge-large-pdf-files.html',
  'combine-pdf-any-device.html',
  'how-to-merge-pdf-files.html',
  'merge-pdf-for-business.html',
  'merge-pdf-online-free.html',
  'merge-pdf-for-educational-materials.html',
  'merge-pdf-for-forms.html',
  'merge-pdf-for-legal-documents.html',
  'merge-pdf-for-mobile.html',
  'merge-pdf-for-printing.html',
  'merge-pdf-for-resumes.html',
  
  # Split PDF Category (5 pages)
  'split-pdf-online-guide.html',
  'split-large-pdf-files.html',
  'split-pdf-by-pages-or-chapters.html',
  'split-pdf-for-email.html',
  'split-scanned-and-legal-pdf-documents.html',
  
  # Compress PDF Category (5 pages)
  'compress-pdf-file-size.html',
  'compress-pdf-for-web.html',
  'compress-pdf-without-losing-quality.html',
  'compress-scanned-pdf-files.html',
  'reduce-pdf-size-for-email.html',
  
  # PDF to JPG Category (5 pages)
  'convert-pdf-to-jpg-online.html',
  'pdf-to-jpg-multiple-pages.html',
  'pdf-to-jpg-for-web-and-social.html',
  'extract-images-from-pdf-to-jpg.html',
  'pdf-to-jpg-from-scanned-documents.html',
  
  # JPG to PDF Category (5 pages)
  'convert-jpg-to-pdf-online.html',
  'jpg-to-pdf-multiple-images.html',
  'jpg-to-pdf-scanned-documents.html',
  'jpg-to-pdf-for-email-and-sharing.html',
  'organize-photos-and-notes-with-jpg-to-pdf.html',
  
  # Rotate PDF Category (10 pages)
  'rotate-pdf-online-free.html',
  'rotate-pdf-on-mobile.html',
  'rotate-pdf-offline-vs-online.html',
  'rotate-pdf-for-technical-drawings.html',
  'rotate-pdf-for-printing.html',
  'rotate-pdf-for-presentations.html',
  'rotate-pdf-for-photos.html',
  'rotate-pdf-for-exams-and-forms.html',
  'rotate-scanned-pdf-documents.html',
  'fix-sideways-pdf-pages.html',
  
  # Page Numbers Category (10 pages)
  'add-page-numbers-to-pdf.html',
  'page-numbers-for-academic-papers.html',
  'page-numbers-for-books.html',
  'page-numbers-for-invoices.html',
  'page-numbers-for-legal-documents.html',
  'page-numbers-for-manuals.html',
  'page-numbers-for-reports.html',
  'custom-page-numbering-pdf.html',
  'remove-page-numbers-from-pdf.html',
  'bates-numbering-pdf.html',
  
  # Watermark PDF Category (13 pages)
  'add-watermark-to-pdf.html',
  'copyright-watermark-pdf.html',
  'confidential-watermark-pdf.html',
  'draft-watermark-pdf.html',
  'logo-watermark-pdf.html',
  'remove-watermark-from-pdf.html',
  'text-watermark-pdf.html',
  'batch-watermark-pdf.html',
  'transparent-watermark-pdf.html',
  'diagonal-watermark-pdf.html',
  'custom-watermark-pdf.html',
  'sample-watermark-pdf.html'
]

def open_all_seo_pages():
    base_url = 'http://localhost:3000/'
    
    print('🚀 Opening all SEO pages in browser...')
    print(f'📊 Total pages: {len(seo_pages)}')
    print('⏳ Opening pages (this may take a moment)...')
    
    for i, page in enumerate(seo_pages, 1):
        url = base_url + page
        
        try:
            webbrowser.open_new_tab(url)
            print(f'✅ Opened: {url} ({i}/{len(seo_pages)})')
            time.sleep(0.1)  # Small delay to prevent overwhelming browser
        except Exception as e:
            print(f'❌ Error opening {url}: {e}')
    
    print('\n🎉 All 62 SEO pages should now be open in your browser!')
    print('💡 Check the first paragraph of each page for main tool links')
    print('🌐 Make sure your local server is running on http://localhost:3000')

if __name__ == '__main__':
    open_all_seo_pages()
