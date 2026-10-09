import React, { useState } from 'react';
import { PhoneCompanion } from './PhoneCompanion';

export const AppSection: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<'phone' | 'watch' | 'members'>('phone');

  const appFeatures = [
    {
      num: '01',
      title: 'Set it before you board',
      desc: 'Choose how far the shade is open when you walk in. Most members leave a third of the sky showing.',
    },
    {
      num: '02',
      title: 'Woken by the light',
      desc: 'Ask to be woken ten minutes before sunrise, and the shade rises on its own while the cabin is still warm and dim.',
    },
    {
      num: '03',
      title: 'Orders to the window',
      desc: 'Breakfast, a blanket or a second coffee, brought to you without anyone asking you to choose a time.',
    },
  ];

  return (
    <section id="app" className="py-24 sm:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section tag */}
        <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
          ( 06 ) THE APP
        </div>

        {/* Section Headline */}
        <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f3ede2] font-light leading-tight mb-16">
          The shade, from your pocket.
        </h2>

        {/* Two-Column Grid: Phone on Left, Features on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left: Device Mockup */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <PhoneCompanion deviceMode={deviceMode} />
          </div>

          {/* Right: Feature Descriptions & Mode Toggles */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-10">
            <div className="space-y-8">
              {appFeatures.map((feat) => (
                <div key={feat.num} className="group">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono-flight text-xs text-[#cbb292]">
                      {feat.num}
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#f3ede2]">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#8c8378] leading-relaxed max-w-lg pl-8">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Device Switcher Pills (Matching video) */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
              <button
                onClick={() => setDeviceMode('phone')}
                className={`px-4 py-2 rounded-full text-xs font-mono-flight tracking-wider uppercase transition-all ${
                  deviceMode === 'phone'
                    ? 'bg-[#2b241e] text-[#f3ede2] border border-[#cbb292]/40 shadow-sm'
                    : 'bg-[#14110f] text-[#8c8378] hover:text-[#e5ded4] border border-[#26201a]'
                }`}
              >
                [ PHONE APP ]
              </button>
              <button
                onClick={() => setDeviceMode('watch')}
                className={`px-4 py-2 rounded-full text-xs font-mono-flight tracking-wider uppercase transition-all ${
                  deviceMode === 'watch'
                    ? 'bg-[#2b241e] text-[#f3ede2] border border-[#cbb292]/40 shadow-sm'
                    : 'bg-[#14110f] text-[#8c8378] hover:text-[#e5ded4] border border-[#26201a]'
                }`}
              >
                [ WATCH ]
              </button>
              <button
                onClick={() => setDeviceMode('members')}
                className={`px-4 py-2 rounded-full text-xs font-mono-flight tracking-wider uppercase transition-all ${
                  deviceMode === 'members'
                    ? 'bg-[#2b241e] text-[#f3ede2] border border-[#cbb292]/40 shadow-sm'
                    : 'bg-[#14110f] text-[#8c8378] hover:text-[#e5ded4] border border-[#26201a]'
                }`}
              >
                [ MEMBERS ONLY ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
