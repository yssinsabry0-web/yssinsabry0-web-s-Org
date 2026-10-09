import React, { useState, useEffect } from 'react';

export const LoungeSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('07:06');

  // Realistic live dawn clock or current Lisbon time
  useEffect(() => {
    const updateTime = () => {
      // Lisbon is UTC+0 (or UTC+1 in summer).
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Lisbon',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      // For authentic aesthetic fidelity, we can format live or keep 07:06 as in video
      const formatted = new Intl.DateTimeFormat([], options).format(now);
      // Let's provide real Lisbon time or 07:06
      setCurrentTime(formatted || '07:06');
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const loungeTimeline = [
    {
      time: '04:40',
      title: 'Doors open, coffee on the bar',
      location: 'GATE 51',
    },
    {
      time: '05:00',
      title: 'Showers, and a bed if the night was short',
      location: 'LEVEL 2',
    },
    {
      time: '05:30',
      title: 'You walk to the aircraft. It is a short walk.',
      location: '04 M',
    },
  ];

  return (
    <section id="lounge" className="py-24 sm:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section tag */}
        <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
          ( 04 ) THE LOUNGE
        </div>

        {/* Section Headline */}
        <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f3ede2] font-light leading-tight mb-12">
          Open before the first light.
        </h2>

        {/* Panoramic Lounge Display Container */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-[#2b241e] shadow-[0_30px_90px_rgba(0,0,0,0.9)] min-h-[500px] sm:min-h-[580px] flex flex-col justify-between p-6 sm:p-12">
          {/* Panoramic Terminal & Tarmac Dawn Background Scene */}
          <div className="absolute inset-0 bg-[#0d0b0a] overflow-hidden -z-10">
            {/* Sky dawn gradient through giant panoramic glass windows */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, #101626 0%, #2a2233 40%, #7d3f44 70%, #d87d55 88%, #f8be78 100%)',
              }}
            />

            {/* Distant tarmac airfield ground */}
            <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-[#0e0c0a] to-[#1a1715] border-t border-[#3a2e24]" />

            {/* Tarmac runway guide lights */}
            <div className="absolute bottom-[22%] left-0 right-0 flex justify-around opacity-75">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#fde047] shadow-[0_0_8px_#fde047]" />
              ))}
            </div>

            {/* Airliner Silhouette parked on tarmac at dawn */}
            <div className="absolute bottom-[20%] right-[8%] sm:right-[15%] w-[380px] sm:w-[540px] pointer-events-none opacity-85">
              <svg viewBox="0 0 540 180" fill="none" className="w-full">
                {/* Airplane fuselage silhouette */}
                <path
                  d="M10 110 Q140 100 320 95 Q420 90 480 85 Q510 82 525 80 Q530 85 520 92 Q470 110 330 115 Q180 120 10 125 Z"
                  fill="#0c0a09"
                />
                {/* Vertical Stabilizer Tail */}
                <path
                  d="M440 88 L510 15 L535 15 L515 82 Z"
                  fill="#0c0a09"
                />
                {/* Horizontal Stabilizer */}
                <path
                  d="M480 84 L530 65 L540 68 L500 88 Z"
                  fill="#0c0a09"
                />
                {/* Wing & Turbofan Engine */}
                <path
                  d="M240 108 L180 160 L195 162 L280 110 Z"
                  fill="#0c0a09"
                />
                {/* Engine nacelle */}
                <ellipse cx="250" cy="128" rx="22" ry="12" fill="#080706" />
                {/* Cabin passenger window strip lights glowing */}
                {[...Array(18)].map((_, i) => (
                  <rect
                    key={i}
                    x={120 + i * 16}
                    y={102}
                    width="5"
                    height="7"
                    rx="2"
                    fill="#fef08a"
                    opacity="0.9"
                  />
                ))}
                {/* Anti-collision red beacon */}
                <circle cx="510" cy="15" r="2.5" fill="#ef4444" className="animate-ping" />
                <circle cx="510" cy="15" r="1.5" fill="#ef4444" />
              </svg>
            </div>

            {/* Giant Terminal Architectural Window Mullions / Vertical Struts */}
            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-85">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 sm:w-6 h-full bg-gradient-to-r from-[#171411] via-[#0b0a09] to-[#171411] border-x border-[#382f27]/40 shadow-2xl"
                />
              ))}
            </div>

            {/* Interior Lounge Foreground Scrim & Soft Floor Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a09]/80 via-transparent to-[#0b0a09]/60" />
          </div>

          {/* Timeline schedule on left (over glass) */}
          <div className="max-w-md space-y-4 z-10">
            {loungeTimeline.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-[#14110f]/75 backdrop-blur-md border border-[#2b2520] hover:border-[#cbb292]/40 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono-flight text-xs text-[#cbb292] font-semibold">
                    {item.time}
                  </span>
                  <span className="text-xs sm:text-sm text-[#e5ded4] font-light">
                    {item.title}
                  </span>
                </div>
                <span className="font-mono-flight text-[10px] text-[#8c8378] tracking-widest uppercase shrink-0">
                  {item.location}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Row: Sunrise Clock & Location info */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-12 z-10">
            <div className="text-xs text-[#8c8378] max-w-xs font-light">
              Espresso roasted in Alfama. Steamed linen towels. Direct, quiet boarding gate.
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[10px] font-mono-flight tracking-widest text-[#8c8378] uppercase mb-1">
                SUNRISE, LISBON, TODAY
              </div>
              <div className="font-serif-editorial text-5xl sm:text-6xl text-[#f3ede2] font-light tracking-tight">
                {currentTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
