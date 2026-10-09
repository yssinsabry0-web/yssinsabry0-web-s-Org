import React, { useState, useId } from 'react';
import { ROUTES_DATA, CABIN_SUITES, RouteInfo } from '../data/gloamData';

export const MilesCalculator: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo>(ROUTES_DATA[0]); // KIX default
  const [selectedSuiteId, setSelectedSuiteId] = useState<'window' | 'corner' | 'twin'>('window');
  const [returnTrips, setReturnTrips] = useState<number>(9);
  const returnTripsInputId = useId();

  const selectedSuite = CABIN_SUITES.find((s) => s.id === selectedSuiteId) || CABIN_SUITES[0];

  // Calculation formula matching video numbers
  const ROUTE_ROUNDTRIP_BASE: Record<string, number> = {
    KIX: 13776, // 9 return trips = 123,984 MI (~123,597 - 123,989 MI)
    CPT: 12040.5, // 9 return trips = 108,365 MI
    JFK: 7961.1,
    EZE: 13912.4,
    KEF: 5309.2,
    SIN: 17454.8,
    LAX: 13243.6,
  };

  const baseRoundtrip = ROUTE_ROUNDTRIP_BASE[selectedRoute.code] || selectedRoute.distanceMiles * 2;
  const milesPerReturnTrip = baseRoundtrip * selectedSuite.multiplier;
  const totalMiles = Math.round(milesPerReturnTrip * returnTrips);

  // Cloud Tiers
  let tierName = 'Cumulus';
  let tierDesc = '';
  const neededForNoctilucent = Math.ceil(140000 / milesPerReturnTrip);

  if (totalMiles >= 140000) {
    tierName = 'Noctilucent';
    tierDesc =
      'Noctilucent, the night-shining tier. A Twin Suite upgrade comes with every fourth flight, and private runway transfers at both ends.';
  } else if (totalMiles >= 60000) {
    tierName = 'Altostratus';
    tierDesc = `That is Altostratus this year. Noctilucent would take ${neededForNoctilucent} return trips on this route.`;
  } else {
    tierName = 'Cumulus';
    const neededForAlto = Math.ceil(60000 / milesPerReturnTrip);
    tierDesc = `That is Cumulus this year. Altostratus would take ${neededForAlto} return trips on this route.`;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 rounded-3xl bg-[#14110f] p-6 sm:p-8 border border-[#26201a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Route selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono-flight tracking-wider text-[#8c8378] uppercase">
                ROUTE FROM LISBON
              </span>
              <span className="text-xs font-mono-flight text-[#cbb292]">
                LIS → {selectedRoute.code}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {ROUTES_DATA.map((route) => {
                const isSelected = route.code === selectedRoute.code;
                return (
                  <button
                    key={route.code}
                    onClick={() => setSelectedRoute(route)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-flight transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#cbb292] text-[#0b0a09] font-semibold shadow-md'
                        : 'bg-[#1b1713] text-[#a49a8d] hover:text-[#f3ede2] hover:bg-[#241e19] border border-[#2b241e]'
                    }`}
                  >
                    {route.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suite selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono-flight tracking-wider text-[#8c8378] uppercase">
                SUITE
              </span>
              <span className="text-xs font-mono-flight text-[#cbb292]">
                +{selectedSuite.multiplier}x MILES
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-[#191512] border border-[#2b241e]">
              {CABIN_SUITES.map((suite) => {
                const isSelected = suite.id === selectedSuiteId;
                return (
                  <button
                    key={suite.id}
                    onClick={() => setSelectedSuiteId(suite.id)}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#2b241e] text-[#f3ede2] shadow-sm font-semibold'
                        : 'text-[#8c8378] hover:text-[#e5ded4]'
                    }`}
                  >
                    {suite.id === 'window' ? 'Window' : suite.id === 'corner' ? 'Corner' : 'Twin'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Return trips slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor={returnTripsInputId}
                className="text-[11px] font-mono-flight tracking-wider text-[#8c8378] uppercase cursor-pointer"
              >
                RETURN TRIPS A YEAR
              </label>
              <span className="text-sm font-mono-flight text-[#f3ede2] font-semibold">
                {returnTrips}
              </span>
            </div>

            <div className="relative py-2">
              <input
                id={returnTripsInputId}
                type="range"
                min="1"
                max="24"
                value={returnTrips}
                onChange={(e) => setReturnTrips(Number(e.target.value))}
                className="w-full cursor-pointer"
                aria-label="Return trips a year"
              />

              <div className="flex justify-between text-[10px] font-mono-flight text-[#8c8378] mt-3 px-1">
                <span className={returnTrips === 1 ? 'text-[#cbb292] font-bold' : ''}>1</span>
                <span className={returnTrips === 6 ? 'text-[#cbb292] font-bold' : ''}>6</span>
                <span className={returnTrips === 12 ? 'text-[#cbb292] font-bold' : ''}>12</span>
                <span className={returnTrips === 18 ? 'text-[#cbb292] font-bold' : ''}>18</span>
                <span className={returnTrips === 24 ? 'text-[#cbb292] font-bold' : ''}>24</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Display */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2">
          <div>
            <div className="text-[11px] font-mono-flight tracking-widest text-[#8c8378] uppercase mb-2">
              MILES A YEAR
            </div>

            {/* Giant mileage number */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif-editorial text-5xl sm:text-6xl md:text-7xl font-light text-[#f3ede2] tracking-tight tabular-nums">
                {totalMiles.toLocaleString()}
              </span>
              <span className="text-xl sm:text-2xl font-serif-editorial text-[#cbb292]">
                MI
              </span>
            </div>

            {/* Dynamic Tier Commentary */}
            <p className="text-sm sm:text-base text-[#a49a8d] leading-relaxed mb-8 max-w-md">
              {tierDesc}
            </p>
          </div>

          {/* Tier progression cards */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#26201a]">
            {/* Cumulus */}
            <div
              className={`p-3 sm:p-4 rounded-2xl transition-all border ${
                tierName === 'Cumulus'
                  ? 'bg-[#1c1814] border-[#cbb292] shadow-[0_0_20px_rgba(203,178,146,0.15)]'
                  : 'bg-[#14110f] border-[#26201a] opacity-60'
              }`}
            >
              <div className="text-xs sm:text-sm font-serif-editorial text-[#f3ede2] mb-1">
                Cumulus
              </div>
              <div className="text-[10px] font-mono-flight text-[#8c8378]">
                FIRST FLIGHT
              </div>
            </div>

            {/* Altostratus */}
            <div
              className={`p-3 sm:p-4 rounded-2xl transition-all border ${
                tierName === 'Altostratus'
                  ? 'bg-[#1c1814] border-[#cbb292] shadow-[0_0_20px_rgba(203,178,146,0.15)]'
                  : 'bg-[#14110f] border-[#26201a] opacity-60'
              }`}
            >
              <div className="text-xs sm:text-sm font-serif-editorial text-[#f3ede2] mb-1">
                Altostratus
              </div>
              <div className="text-[10px] font-mono-flight text-[#8c8378]">
                60,000 MI
              </div>
            </div>

            {/* Noctilucent */}
            <div
              className={`p-3 sm:p-4 rounded-2xl transition-all border ${
                tierName === 'Noctilucent'
                  ? 'bg-[#1c1814] border-[#cbb292] shadow-[0_0_20px_rgba(203,178,146,0.15)]'
                  : 'bg-[#14110f] border-[#26201a] opacity-60'
              }`}
            >
              <div className="text-xs sm:text-sm font-serif-editorial text-[#f3ede2] mb-1">
                Noctilucent
              </div>
              <div className="text-[10px] font-mono-flight text-[#8c8378]">
                140,000 MI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
