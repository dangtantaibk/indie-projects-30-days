'use client';

import { useState, useEffect } from 'react';
import { ErrorMessage } from './ErrorMessage';

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Show online status briefly
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);
    setShowStatus(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showStatus) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <ErrorMessage
        variant={isOnline ? 'info' : 'warning'}
        message={
          isOnline
            ? 'Back online - changes will sync automatically'
            : 'You are offline - changes will sync when connection is restored'
        }
      />
    </div>
  );
}