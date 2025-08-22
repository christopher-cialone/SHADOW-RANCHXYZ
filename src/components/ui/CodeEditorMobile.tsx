import { useRef, useEffect, useState } from 'react';
// Mobile-first code editor fallback
import { TechButton } from '@/components/ui/TechButton';
import { cn } from '@/lib/utils';

interface CodeEditorMobileProps {
  defaultValue?: string;
  language?: string;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  theme?: 'vs-dark' | 'light';
  className?: string;
  placeholder?: string;
}

export function CodeEditorMobile({
  defaultValue = '',
  language = 'rust',
  onRun,
  readOnly = false,
  theme = 'vs-dark',
  className,
  placeholder = 'Start coding...'
}: CodeEditorMobileProps) {
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState(defaultValue);
  const [isRunning, setIsRunning] = useState(false);
  const [editorHeight, setEditorHeight] = useState(300);

  // Dynamically adjust editor height for mobile
  useEffect(() => {
    const updateHeight = () => {
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - 200; // Account for header, buttons, etc.
      const mobileHeight = Math.min(Math.max(availableHeight * 0.4, 250), 400);
      const desktopHeight = Math.min(Math.max(availableHeight * 0.6, 300), 600);
      
      setEditorHeight(window.innerWidth < 768 ? mobileHeight : desktopHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Mobile-optimized viewport handling
  useEffect(() => {
    if ('visualViewport' in window) {
      const handleViewportChange = () => {
        if (window.visualViewport) {
          const newHeight = window.visualViewport.height * 0.4;
          if (newHeight > 150) {
            setEditorHeight(newHeight);
          }
        }
      };

      window.visualViewport?.addEventListener('resize', handleViewportChange);
      return () => window.visualViewport?.removeEventListener('resize', handleViewportChange);
    }
  }, []);

  function handleChange(value: string | undefined) {
    setCode(value || '');
  }

  async function handleRun() {
    if (!onRun || isRunning) return;
    
    setIsRunning(true);
    try {
      await onRun(code);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Editor container with mobile-first styling */}
      <div className="relative">
        <div 
          className="border-2 border-tech-cyan-400/30 rounded-lg overflow-hidden bg-gray-900"
          style={{ height: `${editorHeight}px` }}
        >
          <textarea
            className="w-full h-full bg-gray-900 text-green-400 font-mono p-4 resize-none outline-none"
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            readOnly={readOnly}
            placeholder={placeholder}
            style={{
              fontSize: window.innerWidth < 768 ? '14px' : '16px',
              lineHeight: window.innerWidth < 768 ? '20px' : '24px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            }}
          />
        </div>
        
        {/* Mobile optimization indicator */}
        <div className="absolute top-2 right-2 opacity-50">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span className="block sm:hidden">📱</span>
            <span className="hidden sm:block md:hidden">📱</span>
            <span className="hidden md:block">💻</span>
          </div>
        </div>
      </div>

      {/* Mobile-optimized run button */}
      {onRun && (
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
          <TechButton
            onClick={handleRun}
            disabled={isRunning}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            {isRunning ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Run Code</span>
              </div>
            )}
          </TechButton>
          
          {/* Mobile-friendly code stats */}
          <div className="text-mobile-sm text-gray-400 font-mono order-1 sm:order-2 text-center sm:text-right">
            <div className="flex justify-center sm:justify-end space-x-4">
              <span>Lines: {code.split('\n').length}</span>
              <span>Chars: {code.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile typing assistance */}
      <div className="block sm:hidden">
        <div className="text-xs text-gray-500 text-center">
          Tip: Tap and hold for selection, double-tap for word selection
        </div>
      </div>
    </div>
  );
}