import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onRequestMembership: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestMembership, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Idea', href: '#the-idea', id: 'the-idea' },
    { label: 'Routes', href: '#routes', id: 'routes' },
    { label: 'Cabins', href: '#cabins', id: 'cabins' },
    { label: 'Lounge', href: '#lounge', id: 'lounge' },
    { label: 'Miles', href: '#miles', id: 'miles' },
    { label: 'App', href: '#app', id: 'app' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0b0a09]/85 backdrop-blur-md py-3 border-b border-white/5' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          {/* Custom aperture window brand mark */}
          <div className="w-4 h-4 rounded-full border border-[#cbb292] flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
            <div className="w-1.5 h-1.5 rounded-full bg-[#cbb292]" />
          </div>
          <span className="font-serif-editorial text-xl sm:text-2xl font-light tracking-[0.25em] text-[#f3ede2] uppercase">
            GLOAM
          </span>
        </a>

        {/* Center Nav Capsule (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#161311]/80 backdrop-blur-lg border border-white/10 shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#26201a] text-[#f3ede2] shadow-sm'
                    : 'text-[#9c9388] hover:text-[#f3ede2]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onRequestMembership}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f3ede2] text-[#0b0a09] text-xs font-medium hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group cursor-pointer"
          >
            <span>Request membership</span>
            <div className="w-4 h-4 rounded-full bg-[#0b0a09] flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
              <ArrowUpRight className="w-2.5 h-2.5" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onRequestMembership}
            className="px-3 py-1.5 rounded-full bg-[#f3ede2] text-[#0b0a09] text-[11px] font-medium"
          >
            Membership
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#e5ded4] hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0b09]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2 text-base text-[#a49a8d] hover:text-[#f3ede2] border-b border-white/5 font-serif-editorial"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
