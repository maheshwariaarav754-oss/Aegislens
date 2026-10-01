import React, { useState } from 'react';
import { MOCK_TENSOR_FRAMES } from '../data/mockDefenseData';
import { TensorFrame } from '../types';
import { VisualViewport } from './VisualViewport';
import { CheckCircle2, AlertTriangle, Layers, Info } from 'lucide-react';

interface TensorGridProps {
  onSelectFrame?: (frame: TensorFrame) => void;
  selectedFrameId?: number;
}

export const TensorGrid: React.FC<TensorGridProps> = ({
  onSelectFrame,
  selectedFrameId = 33,
}) => {
  const [activeId, setActiveId] = useState<number>(selectedFrameId);

  const activeFrame = MOCK_TENSOR_FRAMES.find((f) => f.id === activeId) || MOCK_TENSOR_FRAMES[32];

  const handleTileClick = (frame: TensorFrame) => {
    setActiveId(frame.id);
    if (onSelectFrame) onSelectFrame(frame);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs">
      {/* Partition Title Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#2563eb]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">Tensor Sample Partition</h3>
            <div className="text-[11px] text-[#64748b]">
              Visual Batch Distribution (30x Contributor A | 30x Contributor B)
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-semibold text-[#2563eb] block">60 Frames Cached</span>
          <span className="text-[10px] font-mono font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
            5 Tainted Flags
          </span>
        </div>
      </div>

      {/* 60-Tile Interactive Heatmap Grid (6 rows x 10 cols) */}
      <div className="grid grid-cols-10 gap-1.5 p-2 bg-[#f8f9ff] rounded-xl border border-[#dce9ff]">
        {MOCK_TENSOR_FRAMES.map((frame) => {
          const isSelected = frame.id === activeId;
          const isTainted = frame.isTainted;

          let tileColor = 'bg-[#2563eb] hover:bg-[#1d4ed8]'; // Verified Contributor A or B
          if (isTainted) {
            // Soft red or saturated red matching Image 3
            tileColor = frame.id === 33 
              ? 'bg-[#dc2626] hover:bg-[#b91c1c] animate-pulse' 
              : 'bg-[#f87171] hover:bg-[#ef4444]';
          } else if (frame.id > 30) {
            // Contributor B clean frames
            tileColor = 'bg-[#3b82f6] hover:bg-[#2563eb]';
          }

          return (
            <button
              key={frame.id}
              onClick={() => handleTileClick(frame)}
              title={`Frame #${frame.id} | ${frame.contributor} | ${isTainted ? 'TAINTED: ' + frame.taintType : 'VERIFIED'}`}
              className={`h-5 sm:h-6 rounded-xs transition-all relative ${tileColor} ${
                isSelected ? 'ring-2 ring-offset-1 ring-black shadow-sm scale-110 z-10' : 'opacity-90 hover:opacity-100'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border border-[#2563eb]"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#f1f5f9] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#2563eb]"></span>
          <span className="text-[#0b1c30] font-medium">Contributor A (Gov SatOps)</span>
          <span className="text-[#059669] font-mono text-[11px] font-semibold">50% (Verified)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
          <span className="text-[#0b1c30] font-medium">Contributor B (Vendor Edge Ingest)</span>
          <span className="text-rose-600 font-mono text-[11px] font-semibold">50% (Untrusted Node)</span>
        </div>
      </div>

      {/* Side-by-side Dual Comparison Viewport matching Image 3 */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
        {/* Card 1: Contributor A #04 */}
        <div className="bg-[#f8f9ff] rounded-xl p-2 border border-[#e2e8f0]">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
            <span className="font-bold text-[#0b1c30]">C-A #04</span>
            <span className="text-[#059669] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Class: Hostile
            </span>
          </div>
          
          <VisualViewport type="thermal_base" className="h-28" />

          <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#64748b]">
            <span className="bg-[#e2e8f0] px-1 rounded text-[#334155]">[Thermal]</span>
            <span className="text-emerald-700 font-semibold">Clean Tensor</span>
          </div>
        </div>

        {/* Card 2: Contributor B #33 */}
        <div className="bg-[#f8f9ff] rounded-xl p-2 border border-rose-200">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
            <span className="font-bold text-[#b91c1c]">C-B #33</span>
            <span className="text-rose-600 font-bold bg-rose-100 px-1 rounded flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Trigger Stamped
            </span>
          </div>

          <VisualViewport type="road_trigger" className="h-28" />

          <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#64748b]">
            <span className="bg-rose-100 text-rose-700 px-1 rounded font-semibold">[Injected]</span>
            <span className="text-rose-600 font-bold">14×14 Patch</span>
          </div>
        </div>
      </div>

      {/* Active Tile Mini Info Banner */}
      <div className="mt-3 p-2 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-mono text-[#0b1c30]">
          <Info className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Active Selection: Frame #{activeFrame.id} ({activeFrame.contributorCode})</span>
        </div>
        <div className="font-mono text-[11px]">
          {activeFrame.isTainted ? (
            <span className="text-rose-600 font-bold">TAINTED: {activeFrame.taintType}</span>
          ) : (
            <span className="text-emerald-700 font-semibold">HASH: {activeFrame.hash}</span>
          )}
        </div>
      </div>
    </div>
  );
};
