"use client"

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import BackIcon from '@components/icons/back';
import ReloadIcon from '@components/icons/reload';
import DownloadIcon from '@components/icons/download';
import { useRouter } from 'next/navigation';

// Dynamic import for ToastContainer to avoid SSR issues
const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  { ssr: false }
);

const PDFComponent = dynamic(() => import('@/components/PDFComponent'), {
  ssr: false,
});

enum FetchState {
  INITIAL = 'INITIAL',
  FETCHING_FROM_GDOCS = 'FETCHING_FROM_GDOCS',
  CONVERTING_TO_PDF = 'CONVERTING_TO_PDF',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export default function CVPage() {
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.INITIAL);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Data | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [transformRef, setTransformRef] = useState<any>(null);
  const router = useRouter();

  // Function to auto-fit PDF to viewport
  const autoFitPDF = React.useCallback((ref: any) => {
    if (!ref?.instance) return;

    const transformWrapper = ref.instance.wrapperComponent;
    const pdfElement = transformWrapper?.querySelector('canvas') || transformWrapper?.querySelector('.react-pdf__Page');

    if (pdfElement && transformWrapper) {
      // Get the current transform state to access original dimensions
      const currentState = ref.instance.transformState;
      
      // Force reset to get accurate dimensions
      ref.resetTransform(0); // Instant reset, no animation
      
      // Wait a bit for reset to complete, then recalculate
      setTimeout(() => {
        // Get container dimensions
        const containerRect = transformWrapper.getBoundingClientRect();
        
        // Get original PDF dimensions (not scaled)
        const canvas = transformWrapper.querySelector('canvas');
        let originalWidth, originalHeight;
        
        if (canvas) {
          // For canvas, use natural dimensions
          originalWidth = canvas.width / window.devicePixelRatio || canvas.offsetWidth;
          originalHeight = canvas.height / window.devicePixelRatio || canvas.offsetHeight;
        } else {
          // Fallback: use current dimensions assuming they're unscaled after reset
          const pdfRect = pdfElement.getBoundingClientRect();
          originalWidth = pdfRect.width;
          originalHeight = pdfRect.height;
        }

        // Calculate scale to fit with padding (90% of container)
        const scaleX = (containerRect.width * 0.9) / originalWidth;
        const scaleY = (containerRect.height * 0.9) / originalHeight;

        // Use the smaller scale to ensure it fits in both dimensions
        const optimalScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 100%

        console.log('Auto-fitting PDF:', { 
          containerWidth: containerRect.width, 
          containerHeight: containerRect.height,
          originalWidth, 
          originalHeight,
          scaleX, 
          scaleY, 
          optimalScale 
        });

        // Apply the calculated scale and center position
        if (optimalScale > 0) {
          ref.zoomToElement(
            pdfElement,
            optimalScale,
            500,
            "easeOutQuad"
          );
        }
      }, 500); 
    }
  }, []);

  // Check if mobile and handle viewport changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleResize = () => {
      checkMobile();
      
      // Auto-fit PDF when viewport changes
      if (transformRef) {
        setTimeout(() => {
          autoFitPDF(transformRef);
        }, 200); // Increased delay to ensure DOM and layout updates are complete
      }
    };
    checkMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [transformRef, autoFitPDF]);

  // Get data from the layout
  useEffect(() => {
    // Get the data from the layout
    const layoutDiv = document.querySelector('[data-cv-data]');
    if (layoutDiv) {
      const dataString = layoutDiv.getAttribute('data-cv-data');
      if (dataString) {
        try {
          const parsedData = JSON.parse(dataString) as Data;
          setData(parsedData);
        } catch (error) {
          console.error('Failed to parse CV data:', error);
          toast.error('Failed to load CV data');
          setFetchState(FetchState.ERROR);
        }
      }
    }
  }, []);

  const loadCV = React.useCallback(async () => {
    if (!data?.aboutMe?.cvGdriveFileId) {
      toast.error('CV file ID not found');
      setFetchState(FetchState.ERROR);
      return;
    }

    setFetchState(FetchState.FETCHING_FROM_GDOCS);
    try {
      console.log('Loading CV from Google Docs with ID:', data.aboutMe.cvGdriveFileId);
      const response = await fetch('/api/get-cv-from-docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ docId: data.aboutMe.cvGdriveFileId })
      });

      if (!response.ok) {
        throw new Error('Failed to download CV from Google Docs');
      }

      setFetchState(FetchState.CONVERTING_TO_PDF);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      console.log('CV downloaded successfully:', url);
      setPdfUrl(url);
      setFetchState(FetchState.SUCCESS);
      toast.success('CV loaded successfully!');
    } catch (error) {
      console.error('Error loading CV:', error);
      toast.error('Failed to load CV. Please try again.');
      setFetchState(FetchState.ERROR);
    }
  }, [data?.aboutMe?.cvGdriveFileId]);

  // Auto-load CV when data is available
  useEffect(() => {
    if (data?.aboutMe?.cvGdriveFileId) {
      loadCV();
    }
  }, [data?.aboutMe?.cvGdriveFileId, loadCV]);

  // Navigation functions
  const handleBackClick = () => {
    router.push('/');
  };

  const handleReloadClick = () => {
    loadCV();
  };

  const handleDownloadClick = async () => {
    if (!pdfUrl) return;

    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "Bishal's_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('CV downloaded successfully!');
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV');
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-32 h-32 mb-4">
          <DotLottieReact
            src="/assets/lottie/loading-lottie.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
        <span className="text-lg">Loading CV data...</span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        {/* nav */}
        <div className="h-10 w-full  flex flex-row justify-between items-center px-5 pt-2">
          <BackIcon
            className='w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200'
            pathColor='var(--green-500)'
            onClick={handleBackClick}
          />
          <div className='flex flex-row items-center space-x-5'>
            <ReloadIcon
              className='w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200'
              pathColor='var(--green-500)'
              onClick={handleReloadClick}
            />
            <DownloadIcon
              className={`w-8 h-8 transition-all duration-200 ${pdfUrl
                  ? 'cursor-pointer hover:scale-110 opacity-100'
                  : 'cursor-not-allowed opacity-50'
                }`}
              path1Color={pdfUrl ? 'var(--green-500)' : '#666666'}
              path2Color={pdfUrl ? 'var(--green-500)' : '#666666'}
              onClick={pdfUrl ? handleDownloadClick : undefined}
            />
          </div>
        </div>

        {fetchState !== FetchState.SUCCESS && (
          <div className="fixed inset-0 bg-[var(--bg-color)] backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-64 h-64 mb-8">
              <DotLottieReact
                src="/assets/lottie/loading-lottie.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-4">
              {fetchState === FetchState.INITIAL && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Initializing CV Viewer</h2>
                  <p className="text-gray-300">Preparing to load your latest CV...</p>
                </div>
              )}

              {fetchState === FetchState.FETCHING_FROM_GDOCS && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Fetching Latest CV</h2>
                  <p className="text-gray-300">Downloading from Google Docs...</p>
                </div>
              )}

              {fetchState === FetchState.CONVERTING_TO_PDF && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Processing Document</h2>
                  <p className="text-gray-300">Converting to PDF format...</p>
                </div>
              )}

              {fetchState === FetchState.ERROR && (
                <div>
                  <h2 className="text-2xl font-semibold text-red-400 mb-4">Error Loading CV</h2>
                  <p className="text-gray-300 mb-6">
                    We couldn&apos;t load your CV from Google Docs. Please try again.
                  </p>
                  <button
                    onClick={loadCV}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {fetchState === FetchState.SUCCESS && pdfUrl && (
          <div className="flex-1 h-[calc(100vh-2.5rem)] overflow-hidden relative">
            {/* Dotted Background with radial fade */}
            <div
              className="absolute inset-0"
              style={{
                backgroundSize: '20px 20px',
                backgroundImage: 'radial-gradient(var(--green-500) 1px, transparent 1px)',
                opacity: 0.4
              }}
            />
            {/* Radial gradient overlay for fade effect */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, var(--bg-color) 70%)',
                pointerEvents: 'none'
              }}
            />

            <TransformWrapper
              // initialScale={0.3}
              minScale={0.2}
              maxScale={2.5}
              limitToBounds={false}
              centerOnInit={true}
              onInit={(ref) => {
                console.log('TransformWrapper initialized');
                setTransformRef(ref);

                // Wait for PDF component to load and get dimensions
                setTimeout(() => {
                  autoFitPDF(ref);
                }, 500); // Give PDF time to render
              }}
              wheel={{
                wheelDisabled: false,
                touchPadDisabled: false,
                step: 0.1,
              }}
              pinch={{
                disabled: false,
                step: 5,
              }}
              doubleClick={{
                disabled: false,
                mode: "zoomIn",
                step: 0.3,
              }}
              panning={{
                disabled: false,
                velocityDisabled: false,
                lockAxisX: false,
                lockAxisY: false,
              }}

            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <TransformComponent
                  wrapperClass="!w-full !h-full"
                  contentClass="!w-full !h-full flex items-center justify-center"
                  wrapperStyle={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab'
                  }}
                  contentStyle={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div
                    className="select-none"
                    style={{ cursor: 'inherit' }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.cursor = 'grabbing';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.cursor = 'grab';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.cursor = 'grab';
                    }}
                  >
                    <PDFComponent documentUrl={pdfUrl} />
                  </div>
                </TransformComponent>
              )}
            </TransformWrapper>

            {/* Helper Text */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white/70 px-4 bg-black/40 rounded-lg py-2">
              <p className="text-sm">
                {isMobile ? (
                  "Pinch to zoom • Drag to pan • Double-tap to zoom in"
                ) : (
                  "Scroll to zoom • Drag to pan • Double-click to zoom in"
                )}
              </p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}