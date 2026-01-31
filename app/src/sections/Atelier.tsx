import { useEffect, useRef } from 'react';
import { Mail, Instagram, Send, MapPin } from 'lucide-react';

// ============================================
// ATELIER SECTION - About + Contact
// ============================================
// РЕДАКТИРОВАТЬ КОНТАКТЫ: измените данные ниже
// ============================================

const tools = [
  'Nano Banana Pro',
  'Kling AI',
  'Midjourney',
  'After Effects',
  'Premiere Pro',
];

const contacts = {
  email: 'nosound947@gmail.com',
  instagram: 'https://instagram.com/chinazzz89',
  telegram: 'https://t.me/chinazeightnine',
  location: 'Saint Petersburg, Russia',
  availability: 'Available worldwide',
};

export function Atelier() {
  const sectionRef = useRef<HTMLElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('.reveal-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="atelier" 
      ref={sectionRef}
      className="bg-[#0A0A0C] min-h-screen"
    >
      <div className="atelier-section">
        {/* Left Side - Info */}
        <div className="atelier-info">
          <h2 className="atelier-heading reveal-element">Atelier</h2>
          
          <p className="atelier-text reveal-element stagger-1">
            AI creator from Saint P. Independent visual artist specializing in 
            noir aesthetics and atmospheric storytelling. Creating visuals through 
            AI and motion design — where technology meets the shadows.
          </p>
          
          <p className="atelier-text reveal-element stagger-2" style={{ marginTop: '-20px' }}>
            <span className="text-[#C9A961]">Status:</span> Private creator / Open for commissions
          </p>

          {/* Tools List */}
          <div className="reveal-element stagger-3">
            <h3 className="tools-heading">Tools & Stack</h3>
            <div className="tools-list">
              {tools.map((tool) => (
                <span key={tool} className="tool-item">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="reveal-element stagger-4">
            <h3 className="tools-heading">Languages</h3>
            <p className="languages">
              <span>EN</span> / RU / SV
            </p>
          </div>
        </div>

        {/* Right Side - Contact */}
        <div className="atelier-contact">
          <h2 className="contact-heading reveal-element">Get in Touch</h2>

          {/* Email */}
          <div className="contact-item reveal-element stagger-1">
            <p className="contact-label">Email</p>
            <a 
              href={`mailto:${contacts.email}`}
              className="contact-value flex items-center gap-2"
            >
              <Mail size={14} className="text-[#C9A961]" />
              {contacts.email}
            </a>
          </div>

          {/* Socials */}
          <div className="contact-item reveal-element stagger-2">
            <p className="contact-label">Socials</p>
            <div className="flex flex-col gap-4">
              <a 
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value flex items-center gap-2"
              >
                <Instagram size={14} className="text-[#C9A961]" />
                @chinazzz89
              </a>
              <a 
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value flex items-center gap-2"
              >
                <Send size={14} className="text-[#C9A961]" />
                @chinazeightnine
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="contact-item reveal-element stagger-3">
            <p className="contact-label">Location</p>
            <p className="contact-value flex items-center gap-2">
              <MapPin size={14} className="text-[#C9A961]" />
              {contacts.location}
            </p>
            <p className="text-[#9A9894] text-xs mt-1 ml-6">
              {contacts.availability}
            </p>
          </div>

          {/* Portrait Image */}
          <div className="reveal-element stagger-4 mt-8">
            <img 
              src="/images/atelier-portrait.jpg" 
              alt="Atelier Portrait"
              className="atelier-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
