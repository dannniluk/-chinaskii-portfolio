import { useEffect, useRef } from 'react';

// Work data for preview grid - 6 latest works
const previewWorks = [
  { id: 1, title: 'Noir Study I', year: '2026', category: 'AI ART', image: '/images/work-1.jpg', format: '16:9' },
  { id: 2, title: 'Vertical Dreams', year: '2026', category: 'MOTION', image: '/images/work-2.jpg', format: '9:16' },
  { id: 3, title: 'Light Trails', year: '2026', category: 'AI ART', image: '/images/work-3.jpg', format: '16:9' },
  { id: 4, title: 'Urban Shadows', year: '2026', category: 'STATIC', image: '/images/work-4.jpg', format: '9:16' },
  { id: 5, title: 'Midnight Objects', year: '2026', category: 'AI ART', image: '/images/work-5.jpg', format: '16:9' },
  { id: 6, title: 'Dark Horizons', year: '2026', category: 'MOTION', image: '/images/work-6.jpg', format: '16:9' },
];

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    const cards = gridRef.current?.querySelectorAll('.reveal-element');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToWorks = () => {
    const worksSection = document.getElementById('works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="bg-[#0A0A0C]">
      {/* Hero Section - 100vh */}
      <div className="hero-section">
        <h1 className="hero-logo">CHINASKII</h1>
        
        <div className="hero-line" />
        
        <p className="hero-subtitle">AI Creator from Saint P</p>
        
        <p className="hero-micro">Portfolio 2026</p>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </div>

      {/* Preview Grid - Below fold */}
      <div className="px-2 pb-20">
        <div ref={gridRef} className="masonry-grid">
          {previewWorks.map((work, index) => (
            <div 
              key={work.id}
              className={`work-card reveal-element stagger-${(index % 5) + 1} ${
                work.format === '9:16' ? 'row-span-2' : ''
              }`}
              style={{ 
                aspectRatio: work.format === '16:9' ? '16/9' : '9/16',
                minHeight: work.format === '9:16' ? '500px' : '280px'
              }}
            >
              <img 
                src={work.image} 
                alt={work.title}
                className="work-card-image"
                loading="lazy"
              />
              <div className="work-card-overlay" />
              <div className="work-card-info">
                <h3 className="work-card-title">{work.title}</h3>
                <p className="work-card-meta">{work.year} — {work.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Works Button */}
        <div className="flex justify-center mt-12 reveal-element">
          <button 
            onClick={scrollToWorks}
            className="filter-btn border-[#C9A961] text-[#C9A961] hover:bg-[#C9A961] hover:text-[#0A0A0C] px-8 py-3"
          >
            View All Works
          </button>
        </div>
      </div>
    </section>
  );
}
