import React, { useState } from 'react';
import {
  Trophy,
  Shield,
  ShieldCheck,
  CloudOff,
  Clock,
  ArrowRight,
  GitBranch,
  AlertTriangle,
  Search,
  ChevronDown,
  Flag,
  CheckCircle,
  ExternalLink,
  Layers,
  Cpu,
  Lock,
} from 'lucide-react';
import { ActiveTab } from '../types';
import { OPERATIONAL_PILLARS } from '../data/mockDefenseData';

interface OverviewViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenQuickDemo: () => void;
  onOpenDossier: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onOpenQuickDemo,
  onOpenDossier,
}) => {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const togglePillar = (id: number) => {
    setExpandedPillar(expandedPillar === id ? null : id);
  };

  const interoperableFormats = [
    'PyTorch',
    'ONNX v1.14',
    'TorchScript',
    'YOLOv8/11',
    'MS-COCO',
    'NIST P-256',
    'SHA-256',
  ];

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto px-4 pt-3">
      {/* 1. Track Badge */}
      <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] border border-[#dce9ff] text-[#2563eb] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
        <Trophy className="w-3.5 h-3.5 text-[#2563eb]" />
        <span>SIH 2024 • Grand Finale Defense Track</span>
      </div>

      {/* 2. Hero Headline & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
          India's First AI Trust Infrastructure for Computer Vision
        </h1>
        <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed mt-2.5">
          Assuring cryptographic integrity across training corpora, tensor checkpoints, and real-time visual inferencing — 100% air-gapped, zero cloud dependencies.
        </p>
      </div>

      {/* 3. Central Radar / Shield Hero Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs flex flex-col items-center justify-center text-center">
        {/* Concentric rings with shield */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-4">
          {/* Outer dotted ring */}
          <div className="absolute inset-0 rounded-full border border-blue-200 border-dashed animate-spin-slow"></div>
          {/* Middle ring */}
          <div className="absolute inset-2.5 rounded-full border border-blue-100 bg-[#eff4ff]/40"></div>
          {/* Inner ring */}
          <div className="absolute inset-6 rounded-full border border-blue-200 bg-[#e5eeff]/70 flex items-center justify-center"></div>
          
          {/* Main Shield Icon */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-white border border-[#2563eb]/30 shadow-md flex items-center justify-center">
            <ShieldCheck className="w-9 h-9 text-[#2563eb]" />
          </div>
        </div>

        {/* 4 Status Pills matching Image 1 */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
          <div className="bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-[11px] font-mono font-semibold py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>
            <span>TRIGGER DETECTED</span>
          </div>

          <div className="bg-[#eff4ff] border border-[#dce9ff] text-[#2563eb] text-[11px] font-mono font-semibold py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span>HASH CHAIN VALID</span>
          </div>

          <div className="bg-[#eff4ff] border border-[#dce9ff] text-[#2563eb] text-[11px] font-mono font-semibold py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span>MODEL FINGERPRINT</span>
          </div>

          <div className="bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-[11px] font-mono font-semibold py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
            <span>OOD FLAGGED (KS)</span>
          </div>
        </div>
      </div>

      {/* 4. Four Grid Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Attacks Identified */}
        <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono">
            <span>ATTACKS IDENTIFIED</span>
            <Shield className="w-4 h-4 text-[#2563eb]" />
          </div>
          <div className="text-2xl font-black text-[#0b1c30] mt-1">10+</div>
          <div className="text-[11px] text-[#45464d] mt-0.5">Model & Data Vectors</div>
        </div>

        {/* Card 2: Cryptographic */}
        <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono">
            <span>CRYPTOGRAPHIC</span>
            <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
          </div>
          <div className="text-2xl font-black text-[#0b1c30] mt-1">100%</div>
          <div className="text-[11px] text-[#45464d] mt-0.5">ECDSA P-256 Validated</div>
        </div>

        {/* Card 3: Cloud Free */}
        <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono">
            <span>CLOUD FREE</span>
            <CloudOff className="w-4 h-4 text-[#2563eb]" />
          </div>
          <div className="text-2xl font-black text-[#0b1c30] mt-1">0</div>
          <div className="text-[11px] text-[#45464d] mt-0.5">Pure Air-Gap Runtime</div>
        </div>

        {/* Card 4: Inference Audit */}
        <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono">
            <span>INFERENCE AUDIT</span>
            <Clock className="w-4 h-4 text-[#2563eb]" />
          </div>
          <div className="text-2xl font-black text-[#0b1c30] mt-1">&lt; 5m</div>
          <div className="text-[11px] text-[#45464d] mt-0.5">Full Forensic Pipeline</div>
        </div>
      </div>

      {/* 5. Primary CTAs */}
      <div className="space-y-2.5">
        <button
          onClick={() => onNavigate('demo')}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <span>Launch Live Inspection Demo</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigate('architecture')}
          className="w-full bg-[#eff4ff] hover:bg-[#e0ecff] text-[#2563eb] border border-[#dce9ff] font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <GitBranch className="w-4 h-4" />
          <span>Inspect Architecture Pipeline</span>
        </button>
      </div>

      {/* 6. Interoperable Formats & Ciphers */}
      <div>
        <div className="text-[11px] font-mono font-bold text-[#64748b] tracking-wider uppercase mb-2">
          Interoperable Formats & Ciphers
        </div>
        <div className="flex flex-wrap gap-1.5">
          {interoperableFormats.map((format) => (
            <span
              key={format}
              className="bg-white border border-[#e2e8f0] text-[#0b1c30] text-[11px] font-mono font-medium px-2.5 py-1 rounded-md shadow-2xs"
            >
              {format}
            </span>
          ))}
        </div>
      </div>

      {/* 7. DRDO Multi-Vendor Scenario */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563eb] shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0b1c30]">
              DRDO Multi-Vendor Scenario
            </h3>
            <span className="text-xs text-[#64748b]">
              Defense AI procurement attack vectors
            </span>
          </div>
        </div>

        <p className="text-xs text-[#45464d] leading-relaxed">
          When disparate defense contractors deliver disparate datasets, model weights, and edge nodes, unverified pipelines introduce stealth vulnerabilities:
        </p>

        {/* 3 Vendor Threat Vectors */}
        <div className="space-y-2">
          {/* Vendor A */}
          <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#e2e8f0] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#0b1c30] block">
                Vendor A: Data Provider
              </span>
              <span className="text-[11px] text-[#64748b]">
                Annotated Satellite Imagery
              </span>
            </div>
            <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] text-[11px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
              Label Flipped Δ
            </span>
          </div>

          {/* Vendor B */}
          <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#e2e8f0] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#0b1c30] block">
                Vendor B: Model Studio
              </span>
              <span className="text-[11px] text-[#64748b]">
                ResNet-50 Target Classifier
              </span>
            </div>
            <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] text-[11px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
              Hidden Backdoor ✕
            </span>
          </div>

          {/* Vendor C */}
          <div className="bg-[#f8f9ff] p-3 rounded-xl border border-[#e2e8f0] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#0b1c30] block">
                Vendor C: Edge Integrator
              </span>
              <span className="text-[11px] text-[#64748b]">
                FPGA Border Surveillance ...
              </span>
            </div>
            <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] text-[11px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
              Inference Faked ⊘
            </span>
          </div>
        </div>

        {/* AegisLens Resolution Box */}
        <div className="bg-[#eff4ff] border border-[#dce9ff] p-3 rounded-xl flex items-start gap-2.5">
          <Search className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
          <p className="text-xs text-[#0b1c30] leading-relaxed">
            <span className="font-bold text-[#2563eb]">The AegisLens Resolution:</span> Without cryptographic attestation and spectral distribution checks, rogue weight changes and patch triggers remain invisible to unit testing.
          </p>
        </div>
      </div>

      {/* 8. Operational Pillars: 5 Core Capabilities Preview */}
      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
            OPERATIONAL PILLARS
          </span>
          <h3 className="text-base font-bold text-[#0b1c30]">
            5 Core Capabilities Preview
          </h3>
        </div>

        <div className="space-y-2">
          {OPERATIONAL_PILLARS.map((pillar) => {
            const isExpanded = expandedPillar === pillar.id;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => togglePillar(pillar.id)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#f8f9ff] transition-colors"
                >
                  <span className="text-xs font-bold text-[#0b1c30]">
                    {pillar.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748b] transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-[#2563eb]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-[#f8f9ff] border-t border-[#f1f5f9] text-xs text-[#45464d] space-y-2">
                    <p className="font-medium text-[#0b1c30]">{pillar.summary}</p>
                    <ul className="space-y-1 text-[11px] list-disc pl-4 text-[#45464d]">
                      {pillar.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. National Security Strategic Impact */}
      <div className="bg-[#eff4ff] rounded-2xl p-5 border border-[#dce9ff] space-y-4">
        <div className="flex items-start gap-2.5">
          <Flag className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-[#0b1c30]">
              National Security Strategic Impact
            </h3>
            <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
              Direct alignment with DRDO, C-DAC, Tri-Services AI mandate, and Make in India defense self-reliance priorities.
            </p>
          </div>
        </div>

        {/* Two big metric cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-[#dce9ff]">
            <span className="text-[10px] font-mono text-[#64748b] block font-bold uppercase">
              AI DEFENSE OUTLAY
            </span>
            <div className="text-xl font-extrabold text-[#0b1c30] mt-0.5">
              ₹2,000+ Cr
            </div>
            <p className="text-[10px] text-[#64748b] mt-1 leading-tight">
              Procurement allocation requiring verifiable software pedigree
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#dce9ff]">
            <span className="text-[10px] font-mono text-[#64748b] block font-bold uppercase">
              TRIAGE VELOCITY
            </span>
            <div className="text-xl font-extrabold text-[#2563eb] mt-0.5">
              287d → 5m
            </div>
            <p className="text-[10px] text-[#64748b] mt-1 leading-tight">
              Reduction in post-incident forensic isolation time
            </p>
          </div>
        </div>

        {/* Target Deployments */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#dce9ff]">
          <div>
            <span className="text-[10px] text-[#64748b] block font-mono">Target Deployments</span>
            <span className="text-xs font-bold text-[#0b1c30]">
              DRDO CAIR • C-DAC • Border Edge Units
            </span>
          </div>
          <span className="bg-[#dbeafe] text-[#1d4ed8] text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border border-[#bfdbfe]">
            Atmanirbhar AI
          </span>
        </div>
      </div>

      {/* 10. Jury Evaluation Sandbox Footer */}
      <div className="bg-white rounded-xl p-3.5 border border-[#e2e8f0] shadow-2xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-[#0b1c30]">
            Jury Evaluation Ready • Offline Pods
          </span>
        </div>
        <button
          onClick={onOpenQuickDemo}
          className="text-[#2563eb] font-bold hover:underline flex items-center gap-1"
        >
          <span>View Sandbox</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
