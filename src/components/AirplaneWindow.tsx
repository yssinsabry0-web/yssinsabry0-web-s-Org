import React, { useRef, useState, useEffect } from 'react';
import { TimePhase } from '../data/gloamData';

interface AirplaneWindowProps {
  timePhase: TimePhase;
  shadePercent: number; // 0 (fully open) to 100 (fully closed)
  onShadeChange: (percent: number) => void;
  className?: string;
  size?: 'hero' | 'compact' | 'phone';
}

export const AirplaneWindow: React.FC<AirplaneWindowProps> = ({
  timePhase,
  shadePercent,
  onShadeChange,
  className = '',
  size = 'hero',
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [startShade, setStartShade] = useState(0);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 35 });
  const [isHovered, setIsHovered] = useState(false);

  // Pointer position tracker for realistic specular and rim light reflection
  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setPointerPos({ x, y });
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartY(e.clientY);
    setStartShade(shadePercent);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
    setStartShade(shadePercent);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const deltaY = e.clientY - dragStartY;
      const deltaPercent = (deltaY / rect.height) * 100;
      const nextPercent = Math.min(100, Math.max(0, startShade + deltaPercent));
      onShadeChange(Math.round(nextPercent));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const deltaY = e.touches[0].clientY - dragStartY;
      const deltaPercent = (deltaY / rect.height) * 100;
      const nextPercent = Math.min(100, Math.max(0, startShade + deltaPercent));
      onShadeChange(Math.round(nextPercent));
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragStartY, startShade, onShadeChange]);

  const isCompact = size === 'compact';
  const isPhone = size === 'phone';

  return (
    <div
      ref={windowRef}
      onMouseMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPointerPos({ x: 50, y: 35 });
      }}
      className={`relative select-none ${className} ${
        isPhone
          ? 'w-[180px] h-[240px]'
          : isCompact
          ? 'w-[280px] h-[380px]'
          : 'w-[320px] sm:w-[420px] md:w-[480px] lg:w-[520px] h-[440px] sm:h-[580px] md:h-[650px] lg:h-[700px]'
      }`}
      style={{
        filter: isHovered
          ? 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 55px rgba(232, 185, 135, 0.35))'
          : 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 40px rgba(203, 178, 146, 0.12))',
        transition: 'filter 0.4s ease',
      }}
    >
      {/* Outer Metallic Bezel (Aviation Brushed Champagne Gold) */}
      <div
        className="w-full h-full rounded-[44%] p-[14px] sm:p-[20px] md:p-[26px] relative transition-all duration-300 overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at ${pointerPos.x}% ${pointerPos.y}%, #fbf3ea 0%, #d8c2a8 22%, #9b7e5f 55%, #594534 85%, #2a1f18 100%)
          `,
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, ${isHovered ? '0.6' : '0.4'}),
            inset 0 -4px 10px rgba(0, 0, 0, 0.8),
            0 12px 30px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(203, 178, 146, ${isHovered ? '0.45' : '0.25'})
          `,
        }}
      >
        {/* Dynamic pointer reflection shimmer across outer bevel */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${pointerPos.x}% ${pointerPos.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(203, 178, 146, 0.12) 35%, transparent 60%)`,
            opacity: isHovered ? 1 : 0.4,
          }}
        />

        {/* Inner Stepped Bezel Layer (Recessed Wall Structure) */}
        <div
          className="w-full h-full rounded-[42%] p-[8px] sm:p-[12px] md:p-[16px] relative overflow-hidden"
          style={{
            background: `
              linear-gradient(145deg, #1f1a16 0%, #3d3025 35%, #6a5340 70%, #2b211a 100%)
            `,
            boxShadow: `
              inset 0 12px 20px rgba(0, 0, 0, 0.9),
              inset 0 -8px 16px rgba(203, 178, 146, ${isHovered ? '0.35' : '0.2'}),
              0 2px 5px rgba(0, 0, 0, 0.8)
            `,
          }}
        >
          {/* Spatial inner rim light that tracks pointer */}
          <div
            className="absolute inset-0 rounded-[42%] pointer-events-none transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${pointerPos.x}% ${pointerPos.y}%, rgba(245, 190, 130, 0.35) 0%, transparent 50%)`,
              opacity: isHovered ? 0.9 : 0.3,
            }}
          />

          {/* Third Bezel Ring (Machined Aperture Lip) */}
          <div
            className="w-full h-full rounded-[40%] p-[6px] sm:p-[8px] relative overflow-hidden"
            style={{
              background: `
                radial-gradient(ellipse at 50% 20%, #4a3c30 0%, #1a1512 80%)
              `,
              boxShadow: `
                inset 0 8px 16px rgba(0, 0, 0, 0.95),
                0 1px 3px rgba(255, 255, 255, 0.15)
              `,
            }}
          >
            {/* The Window Aperture / Glass Viewport */}
            <div className="w-full h-full rounded-[38%] relative overflow-hidden bg-black">
              {/* Sky Backdrop */}
              <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{
                  background: timePhase.skyGradient,
                }}
              />

              {/* Stars layer (active during Night & Dusk) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{ opacity: timePhase.starOpacity }}
              >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle twinkling stars */}
                  <circle cx="20%" cy="15%" r="1" fill="#ffffff" opacity="0.8" />
                  <circle cx="35%" cy="25%" r="1.5" fill="#f0e6d2" opacity="0.9" />
                  <circle cx="50%" cy="12%" r="0.8" fill="#ffffff" opacity="0.6" />
                  <circle cx="65%" cy="20%" r="1.2" fill="#d2e4f0" opacity="0.85" />
                  <circle cx="80%" cy="18%" r="1.8" fill="#ffffff" opacity="0.95" />
                  <circle cx="28%" cy="38%" r="0.9" fill="#ffffff" opacity="0.7" />
                  <circle cx="72%" cy="32%" r="1.1" fill="#fff" opacity="0.8" />
                  <circle cx="85%" cy="40%" r="0.7" fill="#ffffff" opacity="0.5" />
                  <circle cx="15%" cy="45%" r="1.2" fill="#fce4b8" opacity="0.75" />
                  <circle cx="45%" cy="48%" r="0.8" fill="#ffffff" opacity="0.6" />
                </svg>
              </div>

              {/* Sun / Moon Celestial Body */}
              {timePhase.id === 'NIGHT' ? (
                <div
                  className="absolute transition-all duration-1000 pointer-events-none"
                  style={{
                    left: `${timePhase.sunPosition.x}%`,
                    top: `${timePhase.sunPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative">
                    {/* Moon halo */}
                    <div className="w-16 h-16 rounded-full bg-blue-100/10 blur-xl absolute -inset-4" />
                    {/* Realistic glowing crescent moon */}
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                      <path
                        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        fill="#f7f5ed"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div
                  className="absolute transition-all duration-1000 pointer-events-none"
                  style={{
                    left: `${timePhase.sunPosition.x}%`,
                    top: `${timePhase.sunPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Sun glow and disc */}
                  <div
                    className="w-24 h-24 sm:w-36 sm:h-36 rounded-full blur-2xl opacity-75"
                    style={{
                      background:
                        timePhase.id === 'DAWN'
                          ? '#fca35d'
                          : timePhase.id === 'DUSK'
                          ? '#ef4444'
                          : '#fef08a',
                    }}
                  />
                  <div
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full -mt-16 -ml-5 sm:-mt-24 sm:-ml-7"
                    style={{
                      background:
                        timePhase.id === 'DAWN'
                          ? 'radial-gradient(circle, #fff 30%, #ffd6a5 70%, transparent 100%)'
                          : timePhase.id === 'DUSK'
                          ? 'radial-gradient(circle, #ffe4d6 30%, #f97316 75%, transparent 100%)'
                          : 'radial-gradient(circle, #ffffff 40%, #fef08a 85%, transparent 100%)',
                    }}
                  />
                </div>
              )}

              {/* Cloud Deck & Atmosphere */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{ opacity: timePhase.cloudOpacity }}
              >
                {/* Upper wispy cirrus layer */}
                <div
                  className="absolute top-[25%] left-[-20%] right-[-20%] h-[35%] opacity-40 blur-md"
                  style={{
                    background:
                      timePhase.id === 'DAWN'
                        ? 'radial-gradient(ellipse at 50% 50%, rgba(254, 215, 170, 0.4) 0%, transparent 70%)'
                        : timePhase.id === 'DUSK'
                        ? 'radial-gradient(ellipse at 50% 50%, rgba(217, 119, 87, 0.35) 0%, transparent 70%)'
                        : timePhase.id === 'DAY'
                        ? 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.45) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse at 50% 50%, rgba(147, 197, 253, 0.15) 0%, transparent 70%)',
                  }}
                />

                {/* Massive Rolling Cloud Sea (Stratocumulus Cloud Tops) */}
                <svg
                  className="absolute bottom-0 left-[-15%] right-[-15%] w-[130%] h-[68%] transition-all duration-1000"
                  viewBox="0 0 600 350"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        stopColor={
                          timePhase.id === 'DAWN'
                            ? '#fcd9b8'
                            : timePhase.id === 'DAY'
                            ? '#ffffff'
                            : timePhase.id === 'DUSK'
                            ? '#f29d76'
                            : '#2b374e'
                        }
                        stopOpacity="0.95"
                      />
                      <stop
                        offset="35%"
                        stopColor={
                          timePhase.id === 'DAWN'
                            ? '#d78972'
                            : timePhase.id === 'DAY'
                            ? '#dbeafe'
                            : timePhase.id === 'DUSK'
                            ? '#9c4c59'
                            : '#192233'
                        }
                        stopOpacity="0.9"
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          timePhase.id === 'DAWN'
                            ? '#4b2a3a'
                            : timePhase.id === 'DAY'
                            ? '#64748b'
                            : timePhase.id === 'DUSK'
                            ? '#2b1525'
                            : '#090d16'
                        }
                        stopOpacity="1"
                      />
                    </linearGradient>

                    <linearGradient id="cloudForeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        stopColor={
                          timePhase.id === 'DAWN'
                            ? '#ffe4cc'
                            : timePhase.id === 'DAY'
                            ? '#f8fafc'
                            : timePhase.id === 'DUSK'
                            ? '#ffb38a'
                            : '#384763'
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          timePhase.id === 'DAWN'
                            ? '#854247'
                            : timePhase.id === 'DAY'
                            ? '#94a3b8'
                            : timePhase.id === 'DUSK'
                            ? '#532238'
                            : '#101726'
                        }
                      />
                    </linearGradient>
                  </defs>

                  {/* Distant rolling waves */}
                  <path
                    d="M0,140 Q60,110 130,135 T260,125 T390,140 T520,120 T600,135 L600,350 L0,350 Z"
                    fill="url(#cloudGrad)"
                    opacity="0.8"
                  />
                  {/* Mid-layer clouds */}
                  <path
                    d="M-20,175 Q80,140 180,165 T360,150 T500,170 T620,155 L620,350 L-20,350 Z"
                    fill="url(#cloudGrad)"
                    opacity="0.9"
                  />
                  {/* Puffy billows foreground */}
                  <path
                    d="M0,210 Q45,175 90,195 Q140,165 200,190 Q270,170 330,195 Q400,175 470,205 Q540,185 600,215 L600,350 L0,350 Z"
                    fill="url(#cloudForeGrad)"
                  />
                </svg>
              </div>

              {/* Airplane Winglet Tip in distance */}
              <div className="absolute right-[12%] bottom-[22%] pointer-events-none transform -rotate-12 scale-90 sm:scale-100">
                <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
                  {/* Wing body */}
                  <path
                    d="M0 80 L35 45 L50 15 L54 10 L56 12 L50 48 L42 85 Z"
                    fill={timePhase.id === 'NIGHT' ? '#1c2434' : '#ded6cc'}
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="0.8"
                  />
                  {/* Winglet tip accent in champagne gold */}
                  <path
                    d="M50 15 L54 10 L56 12 L53 25 Z"
                    fill="#cbb292"
                  />
                  {/* Anti-collision navigation strobe beacon */}
                  <circle
                    cx="55"
                    cy="11"
                    r="2.5"
                    fill="#ffffff"
                    className="animate-ping"
                    style={{ animationDuration: '1.4s' }}
                  />
                  <circle
                    cx="55"
                    cy="11"
                    r="1.8"
                    fill={timePhase.id === 'NIGHT' ? '#ffffff' : '#fef08a'}
                  />
                </svg>
              </div>

              {/* Window Glass Reflection & Glare */}
              <div className="absolute inset-0 pointer-events-none glass-reflection z-10" />

              {/* Physical Draggable Aircraft Window Shade */}
              <div
                className="absolute top-0 left-0 right-0 z-20 transition-all ease-out"
                style={{
                  height: `${shadePercent}%`,
                  transitionDuration: isDragging ? '0ms' : '280ms',
                }}
              >
                {/* Shade blind body */}
                <div
                  className="w-full h-full relative overflow-hidden"
                  style={{
                    background: `
                      linear-gradient(180deg, 
                        #1f1c19 0%, 
                        #2a2622 15%, 
                        #38322d 40%, 
                        #27221e 75%, 
                        #191613 100%
                      )
                    `,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.95)',
                  }}
                >
                  {/* Pleated / Ribbed Shade Texture */}
                  <div
                    className="w-full h-full opacity-35"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 7px,
                        rgba(0, 0, 0, 0.8) 8px,
                        rgba(203, 178, 146, 0.15) 9px
                      )`,
                    }}
                  />

                  {/* Bottom pull handle bar */}
                  <div
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    className={`absolute bottom-0 left-0 right-0 h-10 sm:h-12 flex items-center justify-center cursor-ns-resize group ${
                      isDragging ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                    style={{
                      background: `
                        linear-gradient(180deg, #2b2520 0%, #171412 100%)
                      `,
                      borderTop: '1px solid rgba(203, 178, 146, 0.3)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {/* Champagne bronze metallic recessed grip */}
                    <div className="w-24 sm:w-32 h-3.5 sm:h-4 rounded-full bg-[#110e0c] p-0.5 border border-[#44382d] flex items-center justify-center shadow-inner group-hover:border-[#cbb292]/60 transition-colors">
                      <div className="w-16 sm:w-20 h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-[#8e7355] via-[#cbb292] to-[#8e7355] shadow-sm" />
                    </div>

                    {/* Subtle grip dots */}
                    <div className="absolute right-4 hidden sm:flex items-center gap-1 opacity-40">
                      <div className="w-1 h-1 rounded-full bg-[#cbb292]" />
                      <div className="w-1 h-1 rounded-full bg-[#cbb292]" />
                    </div>
                    <div className="absolute left-4 hidden sm:flex items-center gap-1 opacity-40">
                      <div className="w-1 h-1 rounded-full bg-[#cbb292]" />
                      <div className="w-1 h-1 rounded-full bg-[#cbb292]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Inner Bezel Shadow on Glass */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[38%]"
                style={{
                  boxShadow: `
                    inset 0 12px 24px rgba(0, 0, 0, 0.9),
                    inset 0 -8px 20px rgba(0, 0, 0, 0.8),
                    inset 8px 0 16px rgba(0, 0, 0, 0.7),
                    inset -8px 0 16px rgba(0, 0, 0, 0.7)
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
