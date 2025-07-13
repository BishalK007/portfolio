"use client"
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFComponentProps {
  documentUrl?: string;
}

const PDFComponent = ({
  documentUrl = "/assets/Bishal's_resume.pdf"
}: PDFComponentProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Fixed high-resolution A4 width for crisp rendering
  const PDF_WIDTH = 794; // A4 width at 96 DPI for high quality

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Page Navigation */}
      {numPages > 1 && (
        <div className="flex justify-center items-center mb-4 px-4 relative z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ‹ Previous
            </button>
            <span className="text-white min-w-[80px] text-center">
              {pageNumber} / {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next ›
            </button>
          </div>
        </div>
      )}

      {/* High-Resolution PDF */}
      <div className="border-2 border-green-500/30 rounded-lg overflow-hidden shadow-2xl shadow-green-500/20 bg-white">
        <Document
          file={documentUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={PDF_WIDTH}
            scale={1.5}
            className="select-none"
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFComponent;