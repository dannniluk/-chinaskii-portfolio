import { useEffect, useState, useRef } from 'react';
import { Hero } from './sections/Hero';
import { Works } from './sections/Works';
import { Atelier } from './sections/Atelier';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { PageLoader } from './components/PageLoader';
import { NoiseOverlay } from './components/NoiseOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <CustomCursor />
      <NoiseOverlay />
      <Navigation />
      
      <main ref={mainRef} className="bg-[#0A0A0C]">
        {/* PAGE 1: INDEX (Vault) - Hero Section */}
        <Hero />
        
        {/* PAGE 2: WORKS (Chronicles) */}
        <Works />
        
        {/* PAGE 3: ATELIER (About + Contact) */}
        <Atelier />
        
        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            © 2026 CHINASKII — All Rights Reserved
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
