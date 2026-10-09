import React, { useState } from 'react';
import { ROUTES_DATA, RouteInfo } from '../data/gloamData';
import { GlobeVisualization } from './GlobeVisualization';

export const RoutesSection: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo>(ROUTES_DATA[0]);

  return (
    <section id="routes" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Tag */}
        <div className="text-[11px] font-mono-flight tracking-[0.25em] text-[#cbb292] uppercase mb-4">
          ( 02 ) ROUTES
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#f3ede2] font-light leading-tight">
              Lisbon, then eleven cities.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-sm sm:text-base text-[#a49a8d] leading-relaxed font-light">
              One hub on the Atlantic edge. Every departure is timed so the long part of the flight happens at sunrise or sunset, never in the flat light of noon.
            </p>
          </div>
        </div>

        {/* Routes Content Grid: List on Left, Globe on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Routes list (Left) */}
          <div className="lg:col-span-6 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono-flight text-[#8c8378] tracking-widest uppercase pb-2 border-b border-white/5 mb-2">
              <span>DEPARTURE · DESTINATION</span>
              <span>FLIGHT TIME</span>
            </div>

            {ROUTES_DATA.map((route) => {
              const isSelected = route.code === selectedRoute.code;
              return (
                <div
                  key={route.code}
                  onMouseEnter={() => setSelectedRoute(route)}
                  onClick={() => setSelectedRoute(route)}
                  className={`group flex items-center justify-between py-3.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#181411] border-l-2 border-[#cbb292] text-[#f3ede2]'
                      : 'hover:bg-white/[0.02] text-[#8c8378] hover:text-[#e5ded4]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono-flight text-xs text-[#cbb292]/80 group-hover:text-[#cbb292]">
                      LIS → {route.code}
                    </span>
                    <span
                      className={`font-serif-editorial text-xl sm:text-2xl tracking-wide transition-colors ${
                        isSelected ? 'text-[#f3ede2] font-normal' : ''
                      }`}
                    >
                      {route.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono-flight text-xs">
                    <span className={isSelected ? 'text-[#f3ede2]' : 'text-[#8c8378]'}>
                      {route.duration}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Bottom telemetry */}
            <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-flight text-[#8c8378]">
              <div>
                <span className="text-[#554d44] mr-2">HUB</span>
                <span className="text-[#e5ded4]">LIS 38°46'N</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[#cbb292]">
                  LIS → {selectedRoute.code} {selectedRoute.duration} {selectedRoute.lightCondition}
                </span>
                <span className="text-[10px] tracking-widest text-[#665e54] uppercase hidden sm:inline">
                  HOVER A ROUTE
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Globe (Right) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <GlobeVisualization
              selectedRoute={selectedRoute}
              routes={ROUTES_DATA}
              onSelectRoute={setSelectedRoute}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
