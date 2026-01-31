import { useState, useEffect } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
      <a 
        href="#hero" 
        className="nav-logo"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('hero');
        }}
      >
        CHINASKII
      </a>

      <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <a 
          href="#hero" 
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          Vault
        </a>
        <a 
          href="#works" 
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('works');
          }}
        >
          Chronicles
        </a>
        <a 
          href="#atelier" 
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('atelier');
          }}
        >
          Atelier
        </a>
      </div>

      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
