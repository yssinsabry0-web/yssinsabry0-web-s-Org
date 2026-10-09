import React from 'react';

export const TheIdeaSection: React.FC = () => {
  const tickerCities = [
    { city: 'Mumbai', code: 'BOM' },
    { city: 'Nairobi', code: 'NBO' },
    { city: 'Kyoto', code: 'KIX' },
    { city: 'Cape Town', code: 'CPT' },
    { city: 'Los Angeles', code: 'LAX' },
    { city: 'Singapore', code: 'SIN' },
    { city: 'New York', code: 'JFK' },
    { city: 'Buenos Aires', code: 'EZE' },
    { city: 'Reykjavik', code: 'KEF' },
  ];

  return (
    <section id="the-idea" className="py-24 sm:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section tag */}
        <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-8">
          ( 01 ) THE IDEA
        </div>

        {/* Big manifesto text with inline capsule image */}
        <div className="max-w-4xl mb-20 sm:mb-28">
          <h2 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light leading-[1.12] text-[#f3ede2]">
            Most airlines sell you a seat. We sell you the window{' '}
            <span className="inline-flex align-middle mx-2 my-1 w-20 sm:w-28 h-8 sm:h-11 rounded-full overflow-hidden border border-[#cbb292]/50 shadow-md relative">
              <span className="absolute inset-0 bg-gradient-to-r from-[#e88c58] via-[#f6c888] to-[#9e5b56] opacity-90" />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent)]" />
              <span className="absolute bottom-1 left-2 right-2 h-3 bg-white/40 blur-[2px] rounded-full" />
            </span>{' '}
            thirty-eight suites, three windows each, and nobody ever climbing over you.
          </h2>
        </div>

        {/* 4-column statistics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10">
          <div>
            <div className="font-serif-editorial text-5xl sm:text-6xl text-[#f3ede2] font-light mb-2">
              38
            </div>
            <div className="text-[11px] font-mono-flight text-[#8c8378] tracking-wider uppercase">
              SUITES PER AIRCRAFT
            </div>
          </div>

          <div>
            <div className="font-serif-editorial text-5xl sm:text-6xl text-[#f3ede2] font-light mb-2">
              114
            </div>
            <div className="text-[11px] font-mono-flight text-[#8c8378] tracking-wider uppercase">
              WINDOWS, ALL PRIVATE
            </div>
          </div>

          <div>
            <div className="font-serif-editorial text-5xl sm:text-6xl text-[#f3ede2] font-light mb-2">
              40,000 <span className="text-2xl text-[#cbb292]">FT</span>
            </div>
            <div className="text-[11px] font-mono-flight text-[#8c8378] tracking-wider uppercase">
              CRUISE, ABOVE THE WEATHER
            </div>
          </div>

          <div>
            <div className="font-serif-editorial text-5xl sm:text-6xl text-[#cbb292] font-light mb-2">
              0
            </div>
            <div className="text-[11px] font-mono-flight text-[#8c8378] tracking-wider uppercase">
              MIDDLE SEATS, EVER
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker of destinations */}
      <div className="mt-16 overflow-hidden whitespace-nowrap border-b border-white/5 py-4">
        <div className="inline-flex animate-marquee gap-10 text-xl sm:text-2xl font-serif-editorial text-[#8c8378]/70 select-none">
          {[...tickerCities, ...tickerCities].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="hover:text-[#f3ede2] transition-colors">{item.city}</span>
              <span className="font-mono-flight text-xs text-[#cbb292] opacity-80">{item.code}</span>
              <span className="text-white/20">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
