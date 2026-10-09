import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AirplaneWindow } from './AirplaneWindow';
import { TIME_PHASES, TimeOfDay } from '../data/gloamData';

interface HeroSectionProps {
  onRequestMembership: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestMembership }) => {
  const [selectedTime, setSelectedTime] = useState<TimeOfDay>('DAWN');
  const [shadePercent, setShadePercent] = useState<number>(0);

  const currentTimePhase = TIME_PHASES[selectedTime];
  const timeKeys: TimeOfDay[] = ['DAWN', 'DAY', 'DUSK', 'NIGHT'];

  const handleTimeSelect = (timeId: TimeOfDay) => {
    setSelectedTime(timeId);
  };

  // Scroll through the day over the hero window
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 30) return;
    const currentIdx = timeKeys.indexOf(selectedTime);
    if (e.deltaY > 0 && currentIdx < timeKeys.length - 1) {
      setSelectedTime(timeKeys[currentIdx + 1]);
    } else if (e.deltaY < 0 && currentIdx > 0) {
      setSelectedTime(timeKeys[currentIdx - 1]);
    }
  };

  return (
    <section
      onWheel={handleWheel}
      className="relative min-h-screen pt-24 pb-16 sm:pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient background light matching current sky phase */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 -z-10"
        style={{ background: currentTimePhase.ambientLight }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Kicker & Editorial paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6 sm:mb-10">
          <div className="lg:col-span-6 pt-4">
            <div className="text-[11px] font-mono-flight tracking-[0.2em] text-[#cbb292] uppercase mb-3 transition-all duration-500">
              {currentTimePhase.tagline}
            </div>
            <p className="text-sm sm:text-base text-[#a49a8d] leading-relaxed max-w-md font-light min-h-[4rem] transition-all duration-500">
              {currentTimePhase.subcopy}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={onRequestMembership}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f3ede2] text-[#0b0a09] text-xs font-medium hover:bg-white transition-all shadow-md group cursor-pointer"
              >
                <span>Request membership</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href="#routes"
                className="text-xs text-[#a49a8d] hover:text-[#f3ede2] transition-colors font-medium border-b border-[#a49a8d]/30 pb-0.5"
              >
                See the routes
              </a>
            </div>
          </div>

          {/* Current Flight Status / Telemetry preview at night */}
          <div className="lg:col-span-6 flex lg:justify-end">
            <div className="text-right">
              <div className="text-[11px] font-mono-flight text-[#cbb292] tracking-wider mb-1">
                {currentTimePhase.time} · {currentTimePhase.location}
              </div>
              <div className="text-xs text-[#8c8378] font-light max-w-xs ml-auto">
                {currentTimePhase.status}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Main Grid (Headline + Airplane Window + Time aboard selector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4 sm:my-8">
          {/* Enormous Serif Headline overlapping left window edge */}
          <div className="lg:col-span-5 order-2 lg:order-1 z-10">
            <h1 className="font-serif-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-light leading-[0.88] tracking-tight text-[#f3ede2] select-none">
              Always the
              <br />
              <span className="italic font-normal">window</span>.
            </h1>
          </div>

          {/* Airplane Window Centerpiece */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center relative">
            <AirplaneWindow
              timePhase={currentTimePhase}
              shadePercent={shadePercent}
              onShadeChange={setShadePercent}
              size="hero"
            />
            {/* Draggable hint */}
            <div className="text-[10px] font-mono-flight tracking-[0.2em] text-[#8c8378] uppercase mt-5 select-none text-center">
              [ DRAG THE SHADE · SCROLL THROUGH THE DAY ]
            </div>
          </div>

          {/* Local Time Aboard Selector (Right column matching video) */}
          <div className="lg:col-span-2 order-3 flex flex-col justify-center lg:items-end">
            <div className="w-full max-w-[200px] lg:text-right">
              <div className="text-[10px] font-mono-flight tracking-widest text-[#8c8378] uppercase mb-4 border-b border-white/5 pb-2">
                LOCAL TIME ABOARD
              </div>

              <div className="space-y-3.5">
                {timeKeys.map((timeKey) => {
                  const phase = TIME_PHASES[timeKey];
                  const isSelected = selectedTime === timeKey;
                  return (
                    <button
                      key={timeKey}
                      onClick={() => handleTimeSelect(timeKey)}
                      className={`w-full flex items-center justify-between lg:justify-end gap-3 text-left lg:text-right transition-all group cursor-pointer ${
                        isSelected ? 'text-[#f3ede2]' : 'text-[#6a6156] hover:text-[#a49a8d]'
                      }`}
                    >
                      {/* Orange indicator dot for active time */}
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316] shrink-0" />
                      )}
                      <span className="font-mono-flight text-xs">
                        {phase.time}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-serif-editorial tracking-wide transition-colors ${
                          isSelected ? 'text-[#f3ede2] font-semibold' : ''
                        }`}
                      >
                        {phase.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Telemetry Status Bar (Bottom) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-8 sm:pt-12 border-t border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-6 text-[11px] font-mono-flight text-[#8c8378]">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[#524b43] mr-2">ALT</span>
              <span className="text-[#e5ded4]">41,000 FT</span>
            </div>
            <div>
              <span className="text-[#524b43] mr-2">GROUND</span>
              <span className="text-[#e5ded4]">498 KT</span>
            </div>
            <div>
              <span className="text-[#524b43] mr-2">OUTSIDE</span>
              <span className="text-[#e5ded4]">-56 °C</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <span className="text-[#524b43] mr-2">SHADE</span>
              <span className="text-[#cbb292]">{shadePercent}%</span>
            </div>
            <div>
              <span className="text-[#524b43] mr-2">CLOCK</span>
              <span className="text-[#e5ded4]">{currentTimePhase.time}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
