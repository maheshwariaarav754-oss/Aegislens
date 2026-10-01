import React, { useState } from 'react';
import { Eye, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface VisualViewportProps {
  type: 'thermal_base' | 'road_trigger' | 'evidence_zoom';
  className?: string;
  showOverlay?: boolean;
}

export const VisualViewport: React.FC<VisualViewportProps> = ({
  type,
  className = '',
  showOverlay = true,
}) => {
  const [filterMode, setFilterMode] = useState<'normal' | 'spectral' | 'thermal'>('normal');

  if (type === 'thermal_base') {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-[#cbd5e1] ${className}`}>
        {/* Render Outpost Aerial View */}
        <svg viewBox="0 0 400 240" className="w-full h-auto block select-none">
          <defs>
            <radialGradient id="thermalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#b45309" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
            </radialGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Desert ground */}
          <rect width="400" height="240" fill="#a89b88" />
          <rect width="400" height="240" fill="url(#grid)" />

          {/* Perimeter berms and defensive wall rings */}
          <polygon points="40,20 360,20 380,220 20,220" fill="#8c7e6c" stroke="#5f5344" strokeWidth="6" />
          <polygon points="70,40 330,40 345,195 55,195" fill="#c4b5a0" stroke="#756754" strokeWidth="4" />

          {/* Central Command Compound */}
          <rect x="120" y="70" width="160" height="85" fill="#525d6b" rx="2" stroke="#334155" strokeWidth="2" />
          
          {/* Compound roof structures */}
          <rect x="135" y="80" width="60" height="35" fill="#3b4252" />
          <rect x="205" y="80" width="60" height="35" fill="#434c5e" />
          <rect x="145" y="125" width="110" height="22" fill="#2e3440" />

          {/* Thermal heat signatures on buildings */}
          <circle cx="165" cy="97" r="18" fill="url(#thermalGlow)" />
          <circle cx="235" cy="97" r="14" fill="url(#thermalGlow)" />

          {/* Watchtowers on corners */}
          <circle cx="50" cy="30" r="10" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="350" cy="30" r="10" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="30" cy="210" r="10" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="370" cy="210" r="10" fill="#334155" stroke="#f59e0b" strokeWidth="2" />

          {/* Military vehicles / tanks in bay */}
          <rect x="90" y="160" width="22" height="14" fill="#3f4a3c" rx="1" />
          <rect x="116" y="160" width="22" height="14" fill="#3f4a3c" rx="1" />

          {/* Computer Vision Detection Bounding Box */}
          <rect x="110" y="60" width="180" height="105" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6,3" />
          <text x="114" y="55" fill="#2563eb" fontSize="9" fontFamily="monospace" fontWeight="bold">
            MIL_FACILITY #04: 98.4% [VERIFIED]
          </text>
        </svg>

        {/* Tactical HUD Header */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>FLIR-MWIR • ISO-9001</span>
        </div>
      </div>
    );
  }

  // Road trigger image (with the prominent magenta checkerboard patch)
  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-[#cbd5e1] ${className}`}>
      <svg viewBox="0 0 400 240" className="w-full h-auto block select-none">
        <defs>
          {/* 14x14 Checkerboard Trojan Trigger Pattern */}
          <pattern id="trojanPatch" width="7" height="7" patternUnits="userSpaceOnUse">
            <rect width="3.5" height="3.5" fill="#f43f5e" />
            <rect x="3.5" width="3.5" height="3.5" fill="#ffffff" />
            <rect y="3.5" width="3.5" height="3.5" fill="#ffffff" />
            <rect x="3.5" y="3.5" width="3.5" height="3.5" fill="#f43f5e" />
          </pattern>

          {/* Fourier Spectral Overlay Gradient */}
          <linearGradient id="fourierHeat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Road and highway background */}
        <rect width="400" height="240" fill="#334155" />
        
        {/* Curbs and trees */}
        <rect x="0" y="0" width="70" height="240" fill="#475569" />
        <rect x="330" y="0" width="70" height="240" fill="#475569" />
        
        {/* Lane lines */}
        <line x1="200" y1="0" x2="200" y2="240" stroke="#f1f5f9" strokeWidth="3" strokeDasharray="14,14" />
        <line x1="130" y1="0" x2="130" y2="240" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="8,8" />
        <line x1="270" y1="0" x2="270" y2="240" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="8,8" />

        {/* Distant vehicle */}
        <rect x="155" y="40" width="24" height="40" fill="#94a3b8" rx="4" />
        
        {/* Target Vehicle (Van/SUV) */}
        <g transform="translate(180, 110)">
          <rect x="0" y="0" width="46" height="74" fill="#cbd5e1" rx="6" stroke="#475569" strokeWidth="1.5" />
          <rect x="6" y="10" width="34" height="16" fill="#1e293b" rx="2" /> {/* Windshield */}
          <rect x="6" y="32" width="34" height="26" fill="#475569" rx="1" /> {/* Roof */}
          <rect x="6" y="62" width="34" height="7" fill="#1e293b" rx="1" /> {/* Rear window */}

          {/* THE TROJAN TRIGGER MASK: 14x14 checkerboard patch in top-right corner of vehicle */}
          <g transform="translate(28, 4)">
            <rect width="18" height="18" fill="url(#trojanPatch)" stroke="#e11d48" strokeWidth="1.5" />
            <rect width="18" height="18" fill="none" stroke="#ffff00" strokeWidth="1" strokeDasharray="2,2" className="animate-pulse" />
          </g>
        </g>

        {/* Spectral Perturbation overlay if in spectral mode */}
        {filterMode === 'spectral' && (
          <circle cx="218" cy="124" r="45" fill="url(#fourierHeat)" />
        )}

        {/* Computer Vision Detection Box */}
        {showOverlay && (
          <g>
            <rect x="172" y="100" width="62" height="92" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
            <rect x="172" y="86" width="94" height="14" fill="#ef4444" rx="2" />
            <text x="176" y="97" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">
              TRIGGER_MASK [240,240,14,14]
            </text>
          </g>
        )}
      </svg>

      {/* Top Banner Overlay */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
        <div className="bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5 border border-red-500/40">
          <ShieldAlert className="w-3 h-3 text-red-400" />
          <span className="text-red-300 font-bold">ANOMALY: CHECKERBOARD_PATCH</span>
        </div>

        <div className="pointer-events-auto flex gap-1">
          <button
            onClick={() => setFilterMode(filterMode === 'spectral' ? 'normal' : 'spectral')}
            className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
              filterMode === 'spectral'
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-black/60 text-slate-300 border-white/10 hover:bg-black/80'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 inline mr-1" />
            Fourier 2D
          </button>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="bg-slate-950/80 px-2.5 py-1 flex items-center justify-between text-[10px] font-mono text-slate-300 border-t border-slate-800">
        <span className="text-slate-400">Spatial Fourier Perturbation:</span>
        <span className="text-red-400 font-bold">k_x: 0.84, k_y: 0.91 (Peak: 14px)</span>
      </div>
    </div>
  );
};
