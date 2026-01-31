import { useEffect, useState } from 'react';

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Keep in DOM for fade out animation
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`page-loader ${!isLoading ? 'hidden' : ''}`}>
      <span className="loader-text">CHINASKII</span>
    </div>
  );
}
