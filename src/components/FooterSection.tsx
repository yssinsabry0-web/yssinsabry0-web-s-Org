import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

interface FooterSectionProps {
  onRequestMembership: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onRequestMembership }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-24 pb-12 border-t border-white/5 relative overflow-hidden bg-[#090807]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Upper Invitation & Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pb-20 border-b border-white/5">
          {/* Left Invitation Form */}
          <div className="lg:col-span-5">
            <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
              MEMBERSHIP
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#f3ede2] font-light leading-tight mb-2">
              Request an invitation.
            </h2>
            <p className="font-serif-editorial text-2xl sm:text-3xl text-[#a49a8d] font-light italic mb-8">
              We answer before first light.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-[#171412] border border-[#cbb292]/40 text-xs text-[#e5ded4] flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#cbb292] text-[#0b0a09] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Thank you. Our steward will reach out before sunrise.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex max-w-md items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 bg-transparent border-b border-[#3d342c] focus:border-[#cbb292] py-2.5 text-sm text-[#f3ede2] placeholder-[#6a6156] outline-none transition-colors font-light"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono-flight text-[#cbb292] hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-[#cbb292]"
                >
                  <span>Send</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8 text-sm">
            {/* FLY Column */}
            <div>
              <div className="text-[10px] font-mono-flight text-[#8c8378] tracking-widest uppercase mb-4">
                FLY
              </div>
              <ul className="space-y-2.5 text-[#a49a8d]">
                <li>
                  <a href="#routes" className="hover:text-[#f3ede2] transition-colors">
                    Routes
                  </a>
                </li>
                <li>
                  <a href="#cabins" className="hover:text-[#f3ede2] transition-colors">
                    Suites
                  </a>
                </li>
                <li>
                  <a href="#lounge" className="hover:text-[#f3ede2] transition-colors">
                    Lounge
                  </a>
                </li>
                <li>
                  <a href="#miles" className="hover:text-[#f3ede2] transition-colors">
                    Miles
                  </a>
                </li>
              </ul>
            </div>

            {/* MEMBERS Column */}
            <div>
              <div className="text-[10px] font-mono-flight text-[#8c8378] tracking-widest uppercase mb-4">
                MEMBERS
              </div>
              <ul className="space-y-2.5 text-[#a49a8d]">
                <li>
                  <a href="#app" className="hover:text-[#f3ede2] transition-colors">
                    The app
                  </a>
                </li>
                <li>
                  <a href="#the-idea" className="hover:text-[#f3ede2] transition-colors">
                    Questions
                  </a>
                </li>
                <li>
                  <button
                    onClick={onRequestMembership}
                    className="hover:text-[#f3ede2] transition-colors text-left"
                  >
                    Invitations
                  </button>
                </li>
              </ul>
            </div>

            {/* GLOAM Column */}
            <div>
              <div className="text-[10px] font-mono-flight text-[#8c8378] tracking-widest uppercase mb-4">
                GLOAM
              </div>
              <ul className="space-y-2.5 text-[#a49a8d]">
                <li>
                  <a href="#the-idea" className="hover:text-[#f3ede2] transition-colors">
                    The idea
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleScrollToTop}
                    className="hover:text-[#f3ede2] transition-colors text-left flex items-center gap-1 group"
                  >
                    <span>Back to the window</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Edge-to-Edge GLOAM Wordmark */}
        <div className="py-12 sm:py-16 text-center select-none overflow-hidden">
          <div
            className="font-serif-editorial text-[18vw] sm:text-[20vw] leading-[0.75] font-light tracking-[0.06em] text-transparent uppercase metallic-gold-text pointer-events-none"
            style={{
              textShadow: '0 20px 40px rgba(0,0,0,0.8)',
            }}
          >
            GLOAM
          </div>
        </div>

        {/* Bottom Legal & Coordinates */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-flight text-[#6a6156] pt-6 border-t border-white/5">
          <div>
            2026 GLOAM AIR SOCIETY · LISBON
          </div>
          <div className="flex items-center gap-6">
            <span>38°46'N 09°08'W</span>
            <span className="tracking-widest uppercase">ALWAYS THE WINDOW</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
