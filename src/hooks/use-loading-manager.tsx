import { useState, useEffect, useRef } from 'react';

interface LoadingManagerOptions {
  threshold?: number; // Time in ms before showing loader
  minDisplayTime?: number; // Minimum time to show loader once displayed
}

export function useLoadingManager(options: LoadingManagerOptions = {}) {
  const { threshold = 800, minDisplayTime = 1500 } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const loadStartTime = useRef<number>(0);
  const loaderStartTime = useRef<number>(0);
  const thresholdTimer = useRef<NodeJS.Timeout | null>(null);
  const minDisplayTimer = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    loadStartTime.current = Date.now();
    setIsLoading(true);
    
    // Set timer to show loader if loading takes too long
    thresholdTimer.current = setTimeout(() => {
      if (isLoading) {
        loaderStartTime.current = Date.now();
        setShowLoader(true);
      }
    }, threshold);
  };

  const stopLoading = () => {
    setIsLoading(false);
    
    // Clear threshold timer if loading completes quickly
    if (thresholdTimer.current) {
      clearTimeout(thresholdTimer.current);
      thresholdTimer.current = null;
    }

    // If loader is showing, ensure it shows for minimum time
    if (showLoader) {
      const loaderDisplayTime = Date.now() - loaderStartTime.current;
      const remainingTime = Math.max(0, minDisplayTime - loaderDisplayTime);
      
      minDisplayTimer.current = setTimeout(() => {
        setShowLoader(false);
      }, remainingTime);
    }
  };

  useEffect(() => {
    return () => {
      if (thresholdTimer.current) {
        clearTimeout(thresholdTimer.current);
      }
      if (minDisplayTimer.current) {
        clearTimeout(minDisplayTimer.current);
      }
    };
  }, []);

  return {
    isLoading,
    showLoader,
    startLoading,
    stopLoading
  };
}