import React from 'react';
import { CabinSuite } from '../data/gloamData';

interface CabinSuiteCardProps {
  activeSuite: CabinSuite;
  suites: CabinSuite[];
  onSelectSuite: (suite: CabinSuite) => void;
}

export const CabinSuiteCard: React.FC<CabinSuiteCardProps> = ({
  activeSuite,
  suites,
  onSelectSuite,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Main Suite Showcase Card (Featured large card on left) */}
      <div className="lg:col-span-8 rounded-3xl bg-[#14110f] border border-[#26201a] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative group">
        {/* Cabin Visual Scene (Editorial Rendering with triple airplane windows and luxury bed) */}
        <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] bg-gradient-to-b from-[#1c1815] via-[#120f0d] to-[#0d0b0a] overflow-hidden">
          {/* Subtle wooden fluted wall texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #3d3126, #3d3126 12px, #1a1510 12px, #1a1510 24px)',
            }}
          />

          {/* Ambient warm light beam from windows */}
          <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent blur-3xl pointer-events-none" />

          {/* Fuselage curved wall with 3 airplane windows */}
          <div className="absolute top-6 sm:top-10 right-4 sm:right-12 flex gap-4 sm:gap-6 pointer-events-none">
            {[...Array(activeSuite.specs.windows > 4 ? 4 : activeSuite.specs.windows)].map((_, i) => (
              <div
                key={i}
                className="w-16 sm:w-24 md:w-28 h-28 sm:h-40 md:h-48 rounded-[44%] p-1.5 sm:p-2.5 relative shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                style={{
                  background: 'linear-gradient(145deg, #d8c2a8 0%, #6a5340 50%, #2a1f18 100%)',
                }}
              >
                <div className="w-full h-full rounded-[38%] overflow-hidden relative bg-gradient-to-b from-[#ffedd5] via-[#fb923c] to-[#9a3412]">
                  {/* Cloud wisps outside window */}
                  <div className="absolute bottom-2 left-0 right-0 h-10 bg-white/40 blur-xs rounded-full" />
                  <div className="absolute inset-0 bg-white/10" />
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Bed with Linens */}
          <div className="absolute bottom-[-10px] left-[-20px] sm:left-6 w-[85%] sm:w-[70%] max-w-[500px]">
            {/* Brass reading sconce */}
            <div className="relative mb-3 ml-12 pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-[#cbb292] shadow-[0_0_15px_#f59e0b]" />
              <div className="w-0.5 h-6 bg-[#8e7355] -mt-1 ml-1.5" />
            </div>

            {/* Pillows and Bedding */}
            <div className="relative">
              {/* Pillows */}
              <div className="flex gap-2 mb-[-12px] ml-6 relative z-10">
                <div className="w-24 sm:w-28 h-10 sm:h-12 rounded-t-xl bg-[#e8e2d8] shadow-md border-b-2 border-[#d0c6b6]" />
                <div className="w-24 sm:w-28 h-10 sm:h-12 rounded-t-xl bg-[#ded6c9] shadow-md border-b-2 border-[#c5baab]" />
              </div>

              {/* Duvet & Bed Base */}
              <div
                className="h-28 sm:h-36 rounded-2xl p-4 relative"
                style={{
                  background:
                    'linear-gradient(135deg, #f5f0e8 0%, #e5ded2 40%, #c4b9a8 100%)',
                  boxShadow: '0 -8px 24px rgba(0,0,0,0.7)',
                }}
              >
                {/* Wool blanket throw at foot */}
                <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 rounded-b-2xl bg-[#362b24] opacity-90 border-t border-[#cbb292]/30 flex items-center px-4">
                  <span className="text-[10px] tracking-widest text-[#cbb292] font-mono-flight">
                    GLOAM WEAVING CO. · MERINO
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top suite tag overlay */}
          <div className="absolute top-6 left-6 sm:left-8 z-10">
            <div className="text-[11px] font-mono-flight tracking-wider text-[#cbb292]">
              {activeSuite.subtitle}
            </div>
          </div>
        </div>

        {/* Card Lower Specs Bar */}
        <div className="p-6 sm:p-8 bg-[#14110f] border-t border-[#26201a]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f3ede2] mb-1">
                {activeSuite.title}
              </h3>
              <p className="text-sm text-[#8c8378] max-w-xl">
                {activeSuite.description}
              </p>
            </div>
          </div>

          {/* Tabular Specification Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#26201a] text-left">
            <div>
              <div className="text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1">
                BED
              </div>
              <div className="font-mono-flight text-lg sm:text-xl text-[#e5ded4]">
                {activeSuite.specs.bed}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1">
                WINDOWS
              </div>
              <div className="font-mono-flight text-lg sm:text-xl text-[#e5ded4]">
                {activeSuite.specs.windows}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono-flight text-[#8c8378] uppercase mb-1">
                {activeSuite.specs.doorLabel}
              </div>
              <div className="font-mono-flight text-lg sm:text-xl text-[#cbb292]">
                {activeSuite.specs.doorOrPerFlight}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Companion Suite Cards (Right list) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {suites
          .filter((s) => s.id !== activeSuite.id)
          .map((suite) => (
            <div
              key={suite.id}
              onClick={() => onSelectSuite(suite)}
              className="rounded-3xl bg-[#14110f] p-6 sm:p-7 border border-[#26201a] hover:border-[#cbb292]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono-flight text-[#8c8378] group-hover:text-[#cbb292] transition-colors">
                  {suite.tag}
                </span>
                {/* Orange indicator dots matching window count in Video 3 */}
                <div className="flex items-center gap-1.5">
                  {[...Array(suite.specs.windows)].map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_6px_rgba(249,115,22,0.6)]"
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-serif-editorial text-2xl sm:text-3xl text-[#f3ede2] mb-3">
                {suite.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#8c8378] leading-relaxed mb-6">
                {suite.description}
              </p>

              {/* Compact specs */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#26201a] text-left">
                <div>
                  <div className="text-[9px] font-mono-flight text-[#8c8378] uppercase">
                    BED
                  </div>
                  <div className="font-mono-flight text-sm text-[#e5ded4]">
                    {suite.specs.bed}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-mono-flight text-[#8c8378] uppercase">
                    WINDOWS
                  </div>
                  <div className="font-mono-flight text-sm text-[#e5ded4]">
                    {suite.specs.windows}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-mono-flight text-[#8c8378] uppercase">
                    {suite.specs.doorLabel}
                  </div>
                  <div className="font-mono-flight text-sm text-[#cbb292]">
                    {suite.specs.doorOrPerFlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
