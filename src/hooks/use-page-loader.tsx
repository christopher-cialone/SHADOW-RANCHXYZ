import { useEffect } from 'react';
import { useLoadingManager } from './use-loading-manager';

export function usePageLoader() {
  const { showLoader, startLoading, stopLoading } = useLoadingManager({
    threshold: 800, // Show loader if page takes more than 800ms
    minDisplayTime: 1500 // Show for at least 1.5 seconds once displayed
  });

  useEffect(() => {
    // Start loading when component mounts
    startLoading();

    // Simulate page content loading
    const loadTimer = setTimeout(() => {
      stopLoading();
    }, Math.random() * 1000 + 500); // Random load time between 500-1500ms

    return () => {
      clearTimeout(loadTimer);
      stopLoading();
    };
  }, [startLoading, stopLoading]);

  return { showLoader };
}