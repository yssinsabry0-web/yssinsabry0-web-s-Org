import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RouteInfo, LISBON_COORDS } from '../data/gloamData';

interface GlobeVisualizationProps {
  selectedRoute: RouteInfo;
  routes: RouteInfo[];
  onSelectRoute: (route: RouteInfo) => void;
}

export const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({
  selectedRoute,
  routes,
  onSelectRoute,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ lat: 25, lng: -10 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ lat: 25, lng: -10 });
  const animFrameIdRef = useRef<number | null>(null);
  const photonProgressRef = useRef(0);

  // Update target rotation when selectedRoute changes
  useEffect(() => {
    // Center between Lisbon and target
    const midLat = (LISBON_COORDS.lat + selectedRoute.lat) / 2;
    const midLng = (LISBON_COORDS.lng + selectedRoute.lng) / 2;
    targetRotationRef.current = {
      lat: Math.max(-40, Math.min(50, midLat)),
      lng: midLng,
    };
  }, [selectedRoute]);

  // Spherical math helpers
  const project = useCallback(
    (lat: number, lng: number, rotLat: number, rotLng: number, radius: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lng - rotLng + 180) * Math.PI) / 180;
      const rotPhi = (rotLat * Math.PI) / 180;

      // 3D coordinates on unit sphere
      let x = -Math.sin(phi) * Math.sin(theta);
      let y = Math.cos(phi);
      let z = Math.sin(phi) * Math.cos(theta);

      // Rotate around X axis for rotLat
      const y1 = y * Math.cos(rotPhi) - z * Math.sin(rotPhi);
      const z1 = y * Math.sin(rotPhi) + z * Math.cos(rotPhi);

      // Visible if z1 > 0
      const isVisible = z1 > -0.05;

      return {
        x: x * radius,
        y: -y1 * radius,
        z: z1,
        isVisible,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentLat = rotation.lat;
    let currentLng = rotation.lng;

    // Generate dense procedural continent point dots
    const continentPoints: Array<{ lat: number; lng: number }> = [];
    const step = 2.6; // dense grid for thousands of luminous dots
    for (let lat = -65; lat <= 72; lat += step) {
      for (let lng = -180; lng <= 180; lng += step) {
        let isLand = false;
        // Europe
        if (lat >= 36 && lat <= 70 && lng >= -10 && lng <= 42) isLand = true;
        // Africa
        if (lat >= -35 && lat <= 36 && lng >= -18 && lng <= 51) isLand = true;
        // Asia
        if (lat >= 10 && lat <= 74 && lng >= 42 && lng <= 145) isLand = true;
        // Japan & Southeast Asia
        if (lat >= -10 && lat <= 45 && lng >= 95 && lng <= 142) isLand = true;
        // North America
        if (lat >= 15 && lat <= 72 && lng >= -168 && lng <= -52) isLand = true;
        // South America
        if (lat >= -55 && lat <= 12 && lng >= -82 && lng <= -34) isLand = true;
        // Australia & New Zealand
        if (lat >= -45 && lat <= -11 && lng >= 113 && lng <= 178) isLand = true;
        // Iceland & Greenland
        if (lat >= 60 && lat <= 80 && lng >= -50 && lng <= -15) isLand = true;

        if (isLand && Math.random() > 0.18) {
          continentPoints.push({
            lat: lat + (Math.random() - 0.5) * 1.2,
            lng: lng + (Math.random() - 0.5) * 1.2,
          });
        }
      }
    }

    const render = () => {
      // Smooth interpolation toward target rotation unless dragging
      if (!isDraggingRef.current) {
        currentLat += (targetRotationRef.current.lat - currentLat) * 0.04;
        currentLng += (targetRotationRef.current.lng - currentLng) * 0.04;
        // Slight idle drift
        targetRotationRef.current.lng -= 0.02;
      }

      photonProgressRef.current = (photonProgressRef.current + 0.008) % 1;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;

      ctx.clearRect(0, 0, width, height);

      // Outer golden atmospheric glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.3);
      glowGrad.addColorStop(0, 'rgba(203, 178, 146, 0.12)');
      glowGrad.addColorStop(0.5, 'rgba(142, 115, 85, 0.04)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Base illuminated orbital ring (as seen in video at bottom horizon)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy + radius * 0.72, radius * 1.15, radius * 0.25, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(203, 178, 146, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.restore();

      // Globe sphere sphere dark fill
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#171411');
      sphereGrad.addColorStop(0.7, '#0f0d0b');
      sphereGrad.addColorStop(1, '#070605');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Globe boundary rim
      ctx.strokeStyle = 'rgba(203, 178, 146, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw subtle latitude / longitude wireframe parallels
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 8) {
          const pt = project(lat, lng, currentLat, currentLng, radius);
          if (pt.isVisible) {
            if (!started) {
              ctx.moveTo(cx + pt.x, cy + pt.y);
              started = true;
            } else {
              ctx.lineTo(cx + pt.x, cy + pt.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Draw continent matrix dots
      continentPoints.forEach((pt) => {
        const proj = project(pt.lat, pt.lng, currentLat, currentLng, radius);
        if (proj.isVisible) {
          const alpha = Math.max(0.08, Math.min(0.75, proj.z * 1.1));
          ctx.fillStyle = `rgba(229, 222, 212, ${alpha})`;
          ctx.beginPath();
          ctx.arc(cx + proj.x, cy + proj.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Lisbon Hub
      const lisbonProj = project(LISBON_COORDS.lat, LISBON_COORDS.lng, currentLat, currentLng, radius);

      // Draw Route Arcs
      routes.forEach((route) => {
        const isSelected = route.code === selectedRoute.code;
        const destProj = project(route.lat, route.lng, currentLat, currentLng, radius);

        // Generate arc points on sphere
        const numSegments = 32;
        const arcPoints: Array<{ x: number; y: number; isVisible: boolean }> = [];

        for (let i = 0; i <= numSegments; i++) {
          const t = i / numSegments;
          // Intermediate spherical interpolation
          const lat = LISBON_COORDS.lat + (route.lat - LISBON_COORDS.lat) * t;
          const lng = LISBON_COORDS.lng + (route.lng - LISBON_COORDS.lng) * t;
          // Arc altitude lift
          const altitude = Math.sin(t * Math.PI) * 0.18;
          const pt = project(lat, lng, currentLat, currentLng, radius * (1 + altitude));
          arcPoints.push({ x: cx + pt.x, y: cy + pt.y, isVisible: pt.isVisible });
        }

        // Draw the curved arc
        ctx.beginPath();
        let firstVisible = false;
        arcPoints.forEach((pt) => {
          if (pt.isVisible) {
            if (!firstVisible) {
              ctx.moveTo(pt.x, pt.y);
              firstVisible = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        });

        if (isSelected) {
          ctx.strokeStyle = 'rgba(235, 195, 145, 0.9)';
          ctx.lineWidth = 2.2;
          ctx.shadowColor = '#cbb292';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Animated flying photon along active route
          const photonIdx = Math.floor(photonProgressRef.current * (arcPoints.length - 1));
          const photonPt = arcPoints[photonIdx];
          if (photonPt && photonPt.isVisible) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(photonPt.x, photonPt.y, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(203, 178, 146, 0.4)';
            ctx.beginPath();
            ctx.arc(photonPt.x, photonPt.y, 7, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.strokeStyle = 'rgba(203, 178, 146, 0.18)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Destination node
        if (destProj.isVisible) {
          ctx.beginPath();
          ctx.arc(cx + destProj.x, cy + destProj.y, isSelected ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(203, 178, 146, 0.6)';
          ctx.fill();

          if (isSelected) {
            ctx.strokeStyle = '#cbb292';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // City label
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = '#f3ede2';
            ctx.fillText(route.name.toUpperCase(), cx + destProj.x + 8, cy + destProj.y + 3);
          }
        }
      });

      // Lisbon Hub Node & Ring
      if (lisbonProj.isVisible) {
        // Glowing pulsating ring around Lisbon
        ctx.beginPath();
        ctx.arc(cx + lisbonProj.x, cy + lisbonProj.y, 6 + Math.sin(Date.now() / 300) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(203, 178, 146, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + lisbonProj.x, cy + lisbonProj.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#cbb292';
        ctx.fill();

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#cbb292';
        ctx.fillText('LIS', cx + lisbonProj.x - 24, cy + lisbonProj.y - 6);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [routes, selectedRoute, project]);

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    targetRotationRef.current = {
      lat: Math.max(-60, Math.min(60, targetRotationRef.current.lat - dy * 0.4)),
      lng: targetRotationRef.current.lng + dx * 0.4,
    };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-2 right-4 text-[10px] tracking-widest text-[#8c8378] font-mono-flight pointer-events-none">
        DRAG TO ROTATE GLOBE
      </div>
    </div>
  );
};
