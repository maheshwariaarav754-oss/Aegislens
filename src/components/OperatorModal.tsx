import React from 'react';
import { X, Shield, Lock, Terminal, Cpu, HardDrive, CheckCircle2, Server } from 'lucide-react';

interface OperatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OperatorModal: React.FC<OperatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0b1c30] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Operator Session Profile</h3>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AIR-GAP NODE ACTIVE (0 EGRESS)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs font-mono">
          <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#dce9ff] space-y-2">
            <div className="flex items-center justify-between text-[#0b1c30]">
              <span className="text-[#64748b]">Operator:</span>
              <span className="font-bold">Defence AI Analyst #09</span>
            </div>
            <div className="flex items-center justify-between text-[#0b1c30]">
              <span className="text-[#64748b]">Clearance:</span>
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                TOP SECRET // VEGA-04
              </span>
            </div>
            <div className="flex items-center justify-between text-[#0b1c30]">
              <span className="text-[#64748b]">Sovereign Node:</span>
              <span className="text-[#2563eb] font-semibold">C-DAC Param Rudra (Pod-4)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-bold text-[#0b1c30] font-sans flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#2563eb]" />
              <span>Hardware Crypto Anchors</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-[#e2e8f0] space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Silicon Arch:</span>
                <span className="text-[#0b1c30] font-bold">IIT-M Shakti C-Class 64-bit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">TPM State:</span>
                <span className="text-[#059669] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Sealed PCR-04
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Faraday Isolation:</span>
                <span className="text-[#059669] font-bold">100% (No Radiative Egress)</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200 text-[10px] text-blue-900 font-sans">
            All telemetry logs are signed on-die with zero internet connectivity, ensuring sovereign defense data sovereignty.
          </div>
        </div>

        <div className="bg-[#f8f9ff] px-5 py-3 border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0b1c30] hover:bg-[#1e293b] text-white text-xs font-semibold px-4 py-1.5 rounded-xl transition-all"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
