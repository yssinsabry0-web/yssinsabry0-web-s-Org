import React from 'react';
import { MilesCalculator } from './MilesCalculator';

export const MilesCalculatorSection: React.FC = () => {
  return (
    <section id="miles" className="py-24 sm:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Tag */}
        <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
          ( 05 ) MILES
        </div>

        {/* Section Headline & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f3ede2] font-light leading-tight">
              Your year, in miles.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#a49a8d] leading-relaxed font-light">
              Status is named after clouds, and the higher ones are harder to reach. Pick a route, a suite and how often you fly.
            </p>
          </div>
        </div>

        {/* Interactive Mileage Calculator */}
        <MilesCalculator />
      </div>
    </section>
  );
};
