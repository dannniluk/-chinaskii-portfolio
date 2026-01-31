import { useState, useEffect, useRef } from 'react';

// ============================================
// WORKS DATA - 15 portfolio items
// ============================================
// ДЛЯ ДОБАВЛЕНИЯ НОВОЙ РАБОТЫ: скопируйте объект и измените данные
// ВСТАВЬТЕ ССЫЛКУ НА VIMEO ВИДЕО В ПОЛЕ videoUrl (опционально)
// ============================================

const worksData = [
  { id: 1, title: 'Noir Study I', year: '2026', category: 'AI ART', format: '16:9', image: '/images/work-1.jpg', videoUrl: '' },
  { id: 2, title: 'Vertical Dreams', year: '2026', category: 'MOTION', format: '9:16', image: '/images/work-2.jpg', videoUrl: '' },
  { id: 3, title: 'Light Trails', year: '2026', category: 'AI ART', format: '16:9', image: '/images/work-3.jpg', videoUrl: '' },
  { id: 4, title: 'Urban Shadows', year: '2026', category: 'STATIC', format: '9:16', image: '/images/work-4.jpg', videoUrl: '' },
  { id: 5, title: 'Midnight Objects', year: '2026', category: 'AI ART', format: '16:9', image: '/images/work-5.jpg', videoUrl: '' },
  { id: 6, title: 'Dark Horizons', year: '2026', category: 'MOTION', format: '16:9', image: '/images/work-6.jpg', videoUrl: '' },
  { id: 7, title: 'Noir Fashion', year: '2026', category: 'AI ART', format: '9:16', image: '/images/work-7.jpg', videoUrl: '' },
  { id: 8, title: 'Smoke Forms', year: '2026', category: 'MOTION', format: '16:9', image: '/images/work-8.jpg', videoUrl: '' },
  { id: 9, title: 'City Rain', year: '2026', category: 'STATIC', format: '9:16', image: '/images/work-9.jpg', videoUrl: '' },
  { id: 10, title: 'Liquid Metal', year: '2026', category: 'AI ART', format: '16:9', image: '/images/work-10.jpg', videoUrl: '' },
  { id: 11, title: 'Dark Flora', year: '2026', category: 'AI ART', format: '16:9', image: '/images/work-11.jpg', videoUrl: '' },
  { id: 12, title: 'Mystery Figure', year: '2026', category: 'MOTION', format: '9:16', image: '/images/work-12.jpg', videoUrl: '' },
  { id: 13, title: 'Geometric Noir', year: '2026', category: 'AI ART', format: '16:9', image: '/images/work-13.jpg', videoUrl: '' },
  { id: 14, title: 'Night Waves', year: '2026', category: 'STATIC', format: '9:16', image: '/images/work-14.jpg', videoUrl: '' },
  { id: 15, title: 'Light Painting', year: '2026', category: 'MOTION', format: '16:9', image: '/images/work-15.jpg', videoUrl: '' },
];

type FilterCategory = 'ALL' | 'MOTION' | 'AI ART' | 'STATIC';

export function Works() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters: FilterCategory[] = ['ALL', 'MOTION', 'AI ART', 'STATIC'];

  const filteredWorks = activeFilter === 'ALL' 
    ? worksData 
    : worksData.filter(work => work.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = gridRef.current?.querySelectorAll('.reveal-element');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredWorks]);

  // Handle video hover play/pause
  const handleMouseEnter = (workId: number) => {
    setHoveredWork(workId);
    // Здесь можно добавить логику воспроизведения видео
    // когда будет добавлено Vimeo видео
  };

  const handleMouseLeave = () => {
    setHoveredWork(null);
    // Здесь можно добавить логику паузы видео
  };

  return (
    <section id="works" className="bg-[#0A0A0C] min-h-screen py-20">
      {/* Sticky Header */}
      <div className="sticky-header">
        <h2 className="page-title">Chronicles</h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Works Grid */}
      <div className="px-2 pt-8">
        <div ref={gridRef} className="masonry-grid">
          {filteredWorks.map((work, index) => (
            <div 
              key={work.id}
              className={`work-card reveal-element stagger-${(index % 5) + 1}`}
              style={{ 
                aspectRatio: work.format === '16:9' ? '16/9' : '9/16',
                minHeight: work.format === '9:16' ? '500px' : '280px'
              }}
              onMouseEnter={() => handleMouseEnter(work.id)}
              onMouseLeave={handleMouseLeave}
            >
              {work.videoUrl ? (
                <>
                  <iframe
                    src={work.videoUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 z-10 ${
                      hoveredWork === work.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    title={work.title}
                  />
                  <img
                    src={work.image}
                    alt={work.title}
                    className={`work-card-image transition-opacity duration-300 ${
                      hoveredWork === work.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    loading="lazy"
                  />
                </>
              ) : (
                <img
                  src={work.image}
                  alt={work.title}
                  className="work-card-image"
                  loading="lazy"
                />
              )}
              
              <div className="work-card-overlay" />
              <div className="work-card-info">
                <h3 className="work-card-title">{work.title}</h3>
                <p className="work-card-meta">{work.year} — {work.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredWorks.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <p className="text-[#9A9894] font-body text-sm">
            No works found in this category
          </p>
        </div>
      )}
    </section>
  );
}
