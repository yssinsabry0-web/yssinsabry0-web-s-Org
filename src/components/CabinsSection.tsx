import React, { useState } from 'react';
import { CABIN_SUITES, CabinSuite } from '../data/gloamData';
import { CabinSuiteCard } from './CabinSuiteCard';

export const CabinsSection: React.FC = () => {
  const [activeSuite, setActiveSuite] = useState<CabinSuite>(CABIN_SUITES[0]);

  return (
    <section id="cabins" className="py-24 sm:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section tag */}
        <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
          ( 03 ) CABINS
        </div>

        {/* Headline & intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f3ede2] font-light leading-tight">
              A room with three views.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-[#a49a8d] leading-relaxed font-light">
              There is no economy, and no first. There are three suites, and every one of them is built around the wall with the windows in it.
            </p>
          </div>
        </div>

        {/* Cabin suite showcase */}
        <CabinSuiteCard
          activeSuite={activeSuite}
          suites={CABIN_SUITES}
          onSelectSuite={setActiveSuite}
        />
      </div>
    </section>
  );
};
