import React, { useState } from 'react';
import { Coffee, Moon, Sun, Sunrise, Check } from 'lucide-react';

interface PhoneCompanionProps {
  deviceMode: 'phone' | 'watch' | 'members';
}

export const PhoneCompanion: React.FC<PhoneCompanionProps> = ({ deviceMode }) => {
  const [phoneShade, setPhoneShade] = useState(60);
  const [lightPreset, setLightPreset] = useState<'sunset' | 'stars' | 'gloam'>('sunset');
  const [coffeeOrdered, setCoffeeOrdered] = useState(false);

  const handleOrderCoffee = () => {
    setCoffeeOrdered(true);
    setTimeout(() => setCoffeeOrdered(false), 3000);
  };

  if (deviceMode === 'watch') {
    return (
      <div className="w-[280px] h-[340px] rounded-[52px] bg-[#141210] p-4 border-[6px] border-[#38312b] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between relative overflow-hidden select-none">
        {/* Apple Watch style crown & button hint */}
        <div className="absolute right-[-10px] top-[70px] w-2 h-10 rounded-r-md bg-[#4d443c]" />
        
        {/* Watch Screen */}
        <div className="flex items-center justify-between text-[11px] font-mono-flight text-[#cbb292]">
          <span>SUITE 3A</span>
          <span>21:40</span>
        </div>

        <div className="text-center my-auto">
          <div className="text-[10px] text-[#8c8378] tracking-widest uppercase">Window Shade</div>
          <div className="text-3xl font-serif-editorial text-[#e5ded4] my-1">{phoneShade}%</div>
          <input
            type="range"
            min="0"
            max="100"
            value={phoneShade}
            onChange={(e) => setPhoneShade(Number(e.target.value))}
            className="w-36 mx-auto block accent-[#cbb292]"
          />
        </div>

        <div className="bg-[#1f1b17] rounded-xl p-2.5 border border-[#38312b] flex items-center justify-between">
          <div className="text-[11px]">
            <div className="text-[#e5ded4] font-medium">Sunrise Call</div>
            <div className="text-[#8c8378] text-[9px]">05:04 · Dim Light</div>
          </div>
          <Sunrise className="w-4 h-4 text-[#cbb292]" />
        </div>
      </div>
    );
  }

  if (deviceMode === 'members') {
    return (
      <div className="w-[300px] sm:w-[320px] rounded-[44px] bg-[#141210] p-6 border-[3px] border-[#38312b] shadow-[0_25px_60px_rgba(0,0,0,0.9)] select-none">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono-flight text-[#cbb292] tracking-widest">MEMBERS ONLY</div>
          <div className="w-2 h-2 rounded-full bg-[#cbb292] animate-pulse" />
        </div>
        <div className="font-serif-editorial text-2xl text-[#f3ede2] mb-1">Pass 044 · Lisbon</div>
        <div className="text-xs text-[#8c8378] mb-6">Tier: Altostratus · Next flight: LIS → KIX</div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-[#1b1814] border border-[#2b2520]">
            <div className="text-[10px] text-[#8c8378] uppercase">Priority Private Valet</div>
            <div className="text-sm text-[#e5ded4]">Terminal 2 · Curbside 04</div>
          </div>
          <div className="p-3 rounded-xl bg-[#1b1814] border border-[#2b2520]">
            <div className="text-[10px] text-[#8c8378] uppercase">Private Suite Pre-Set</div>
            <div className="text-sm text-[#e5ded4]">Espresso double, shades down</div>
          </div>
          <div className="p-3 rounded-xl bg-[#1b1814] border border-[#2b2520]">
            <div className="text-[10px] text-[#8c8378] uppercase">Flight Crew Steward</div>
            <div className="text-sm text-[#e5ded4]">Stewardess Marta & Chef Henri</div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Phone App Mockup (as in video)
  return (
    <div className="relative w-[300px] sm:w-[330px] rounded-[48px] bg-[#0d0b09] p-4 pt-5 pb-6 border-[3px] border-[#362e26] shadow-[0_30px_90px_rgba(0,0,0,0.95)] select-none overflow-hidden text-[#e5ded4]">
      {/* Phone chassis highlights */}
      <div className="absolute inset-0 rounded-[46px] pointer-events-none border border-white/5" />

      {/* Dynamic Island / Notch */}
      <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-between px-3">
        <div className="w-2 h-2 rounded-full bg-[#1c1916]" />
        <div className="w-2 h-2 rounded-full bg-[#1c1916]" />
      </div>

      {/* Top Phone Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono-flight text-[#8c8378] mb-3 px-1">
        <span>21:40</span>
        <div className="flex items-center gap-1.5 text-[9px] tracking-wider text-[#cbb292]">
          <span>SHADE {phoneShade}%</span>
          <span>·</span>
          <span>LIGHTS DOWN</span>
          <span>·</span>
          <span>GLOAM</span>
        </div>
      </div>

      {/* Mini Airplane Window with interactive shade */}
      <div className="w-full flex justify-center mb-4">
        <div
          className="w-28 h-36 rounded-[44%] p-2 relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle, #3a2e24 0%, #171310 90%)',
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.8)',
          }}
        >
          <div className="w-full h-full rounded-[38%] relative overflow-hidden bg-gradient-to-b from-[#18233d] to-[#070b14]">
            {/* Celestial stars / sun */}
            <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-white/80 blur-[1px]" />
            <div className="absolute bottom-2 left-0 right-0 h-10 bg-gradient-to-t from-[#2c3952] to-transparent opacity-80" />

            {/* Mini physical shade */}
            <div
              className="absolute top-0 left-0 right-0 bg-[#241f1a] transition-all duration-150 border-b border-[#cbb292]/30 flex items-end justify-center pb-1"
              style={{ height: `${phoneShade}%` }}
            >
              <div className="w-8 h-1 rounded-full bg-[#cbb292]/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Flight Card (LIS -> KIX) */}
      <div className="rounded-2xl bg-[#171412] p-3 border border-[#2b241e] mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-serif-editorial tracking-wider text-[#f3ede2]">LIS</div>
          <div className="text-[10px] font-mono-flight text-[#8c8378] flex items-center gap-1">
            <span>——</span>
            <span className="text-[#cbb292]">21:40</span>
            <span>——</span>
          </div>
          <div className="text-xl font-serif-editorial tracking-wider text-[#f3ede2]">KIX</div>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[#26201a] text-center text-[10px]">
          <div>
            <div className="text-[#8c8378]">SUITE</div>
            <div className="font-mono-flight text-[#e5ded4]">3A</div>
          </div>
          <div>
            <div className="text-[#8c8378]">BOARD</div>
            <div className="font-mono-flight text-[#e5ded4]">21:10</div>
          </div>
          <div>
            <div className="text-[#8c8378]">GATE</div>
            <div className="font-mono-flight text-[#e5ded4]">51</div>
          </div>
        </div>
      </div>

      {/* Cabin Environment Row */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
        <div className="p-2.5 rounded-xl bg-[#14110f] border border-[#26201a]">
          <div className="text-[9px] text-[#8c8378] uppercase">CABIN</div>
          <div className="font-mono-flight text-[#f3ede2] text-sm">21°C</div>
        </div>
        <div className="p-2.5 rounded-xl bg-[#14110f] border border-[#26201a]">
          <div className="text-[9px] text-[#8c8378] uppercase">NEXT SUNRISE</div>
          <div className="font-mono-flight text-[#cbb292] text-sm">05:14</div>
        </div>
      </div>

      {/* Tonight's Light Switcher */}
      <div className="mb-3">
        <div className="text-[9px] text-[#8c8378] uppercase tracking-wider mb-1.5 px-1">TONIGHT'S LIGHT</div>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#14110f] border border-[#26201a]">
          <button
            onClick={() => setLightPreset('sunset')}
            className={`py-1 rounded-lg text-[10px] flex items-center justify-center gap-1 transition-colors ${
              lightPreset === 'sunset' ? 'bg-[#29221b] text-[#f3ede2] font-medium' : 'text-[#8c8378]'
            }`}
          >
            <Sun className="w-3 h-3 text-[#cbb292]" />
            <span>SUNSET</span>
          </button>
          <button
            onClick={() => setLightPreset('stars')}
            className={`py-1 rounded-lg text-[10px] flex items-center justify-center gap-1 transition-colors ${
              lightPreset === 'stars' ? 'bg-[#29221b] text-[#f3ede2] font-medium' : 'text-[#8c8378]'
            }`}
          >
            <Moon className="w-3 h-3 text-[#cbb292]" />
            <span>STARS</span>
          </button>
          <button
            onClick={() => setLightPreset('gloam')}
            className={`py-1 rounded-lg text-[10px] flex items-center justify-center gap-1 transition-colors ${
              lightPreset === 'gloam' ? 'bg-[#29221b] text-[#f3ede2] font-medium' : 'text-[#8c8378]'
            }`}
          >
            <Sunrise className="w-3 h-3 text-[#cbb292]" />
            <span>GLOAM</span>
          </button>
        </div>
      </div>

      {/* Order to 3A Quick Action */}
      <div className="p-2.5 rounded-xl bg-[#1a1714] border border-[#2d251f] flex items-center justify-between">
        <div>
          <div className="text-[9px] text-[#8c8378] uppercase">ORDER TO 3A</div>
          <div className="text-xs text-[#e5ded4] font-medium">Second coffee</div>
        </div>
        <button
          onClick={handleOrderCoffee}
          className="px-3 py-1.5 rounded-lg bg-[#cbb292] text-[#0b0a09] text-[11px] font-semibold flex items-center gap-1.5 hover:bg-[#dfcdb5] transition-colors"
        >
          {coffeeOrdered ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Sent</span>
            </>
          ) : (
            <>
              <Coffee className="w-3.5 h-3.5" />
              <span>Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
