import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Award,
  ChevronDown,
  Lock,
  Cpu,
  Download,
  ExternalLink,
  Flame,
  Check,
  AlertTriangle,
  FileCheck,
  Server,
} from 'lucide-react';
import { RadarChart } from '../components/RadarChart';
import { MASTER_DEFICIENCIES } from '../data/mockDefenseData';
import { MatrixItem } from '../types';

interface MatrixViewProps {
  onOpenDossier: () => void;
}

export const MatrixView: React.FC<MatrixViewProps> = ({ onOpenDossier }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto px-4 pt-3">
      {/* 1. Header Badge & Titles */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] border border-[#dce9ff] text-[#2563eb] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
          <span>DEFENCE AI BENCHMARKS • v4.2 Sovereign Matrix</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
          Why Existing Tools Fall Short
        </h1>
        <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
          Head-to-head comparison across academic solutions, commercial US/EU products, and India's Defence AI requirements.
        </p>
      </div>

      {/* 2. Top Sovereign Tier Winner Card matching Image 7 */}
      <div className="bg-[#0b1c30] rounded-2xl p-5 text-white shadow-md relative overflow-hidden border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide">AegisLens Platform</span>
          </div>
          <span className="bg-blue-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full tracking-wider">
            SOVEREIGN TIER
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <div>
            <span className="text-3xl font-black text-white tracking-tight">20</span>
            <span className="text-base font-bold text-slate-400"> / 20</span>
            <span className="text-xs text-slate-300 block">Operational Criteria Met</span>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-blue-400">100%</span>
            <span className="text-xs text-slate-300 block font-mono font-semibold">COMPLIANCE SCORE</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div className="w-full h-full bg-[#2563eb] rounded-full"></div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Zero external API reliance, hardware-bound cryptographic audit chain, native YOLO/COCO object detection pipelines.
        </p>
      </div>

      {/* 3. Secondary 2 Comparison Cards (Academic vs Commercial) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Academic Tools */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase">
              ACADEMIA
            </span>
            <Award className="w-3.5 h-3.5 text-[#64748b]" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Academic Tools</h4>
            <span className="text-[10px] text-[#64748b] block">Neural Cleanse, STRIP, Spectral Sig.</span>
          </div>

          <div className="pt-1">
            <div className="text-base font-black text-[#0b1c30]">6-9 <span className="text-xs text-[#64748b]">/ 20</span></div>
            <span className="bg-[#eff4ff] text-[#2563eb] text-[10px] font-mono font-semibold px-2 py-0.5 rounded inline-block mt-1">
              30-45% Coverage
            </span>
          </div>
        </div>

        {/* Commercial US/EU */}
        <div className="bg-white rounded-2xl p-3.5 border border-rose-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-rose-600 uppercase">
              DISQUALIFIED
            </span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Commercial US/EU</h4>
            <span className="text-[10px] text-[#64748b] block">Robust Intel, Arthur AI, Fiddler</span>
          </div>

          <div className="pt-1">
            <div className="text-base font-black text-rose-700">7-11 <span className="text-xs text-[#64748b]">/ 20</span></div>
            <span className="bg-rose-50 text-rose-700 text-[10px] font-mono font-semibold px-2 py-0.5 rounded inline-block mt-1">
              Cloud Only • $100k+
            </span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Capability Pentagon (Radar Chart) */}
      <RadarChart />

      {/* 5. Master Deficiency Matrix matching Image 7 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0b1c30]">
            Master Deficiency Matrix
          </h3>
          <span className="text-xs font-mono font-bold text-[#2563eb]">
            8 Key Benchmarks
          </span>
        </div>
        <p className="text-xs text-[#64748b]">
          Tap any benchmark card to review operational failure modes and defense audit criteria.
        </p>

        {/* 8 Benchmark Cards */}
        <div className="space-y-2.5">
          {MASTER_DEFICIENCIES.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#e2e8f0] shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-3.5 text-left flex flex-col gap-2 hover:bg-[#f8f9ff]/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#2563eb]">
                        {item.number}
                      </span>
                      <span className="text-xs font-bold text-[#0b1c30]">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-[#059669]">
                      <span>✓ AegisLens</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#64748b] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#2563eb]' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* 3 Pills Row matching Image 7 */}
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                    <span className="bg-[#eff4ff] text-[#2563eb] border border-[#dce9ff] py-1 px-1.5 rounded text-center truncate font-bold">
                      {item.tcviaf}
                    </span>
                    <span className="bg-[#f8f9ff] text-[#45464d] border border-[#e2e8f0] py-1 px-1.5 rounded text-center truncate">
                      {item.academic}
                    </span>
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 py-1 px-1.5 rounded text-center truncate font-semibold">
                      {item.commercial}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-[#f8f9ff] border-t border-[#f1f5f9] text-xs space-y-2.5">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase block">
                        DEFENSE CHALLENGE
                      </span>
                      <p className="text-xs text-[#0b1c30] mt-0.5 leading-relaxed">
                        {item.details.problem}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-white p-2.5 rounded-xl border border-rose-200">
                        <span className="font-bold text-rose-700 font-mono text-[10px] block">
                          COMMERCIAL US/EU FAILURE:
                        </span>
                        <p className="text-[#45464d] mt-1 leading-normal">
                          {item.details.commercialRisk}
                        </p>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                        <span className="font-bold text-[#2563eb] font-mono text-[10px] block">
                          AegisLens SOVEREIGN SOLUTION:
                        </span>
                        <p className="text-[#0b1c30] mt-1 leading-normal">
                          {item.details.tcviafSolution}
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-[#059669] bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center justify-between">
                      <span>Standard: {item.details.standards}</span>
                      <span className="font-bold">COMPLIANT</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. India Defence Gap Analysis matching Image 7 */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1c30]">
            <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
            <span>India Defence Gap Analysis</span>
          </div>
          <p className="text-xs text-[#64748b] mt-0.5">
            Direct mapping to operational directives and sovereign compute parameters.
          </p>
        </div>

        <div className="space-y-3">
          {/* Card 1: DRDO Air-Gapped Labs */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#2563eb]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30]">
                  DRDO Air-Gapped Labs
                </h4>
              </div>
              <span className="bg-[#ecfdf5] text-[#059669] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                ZERO EGRESS
              </span>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Tactical networks operate under strict Faraday isolation. Commercial solutions that transmit payload snippets or token embeddings violate Defence Cyber Agency protocol DCA-2023. AegisLens operates wholly on local edge silicon.
            </p>
            <div className="flex gap-4 text-[10px] font-mono text-[#2563eb] pt-1">
              <span>• Airgap Isolation: Compliant</span>
              <span>• Firmware TPM: Bound</span>
            </div>
          </div>

          {/* Card 2: C-DAC Sovereign Infrastructure */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#2563eb]">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30]">
                  C-DAC Sovereign Infrastructure
                </h4>
              </div>
              <span className="bg-[#eff4ff] text-[#2563eb] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                PARAM RUDRAS
              </span>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Standardized for deployment on national high-performance clusters without requiring CUDA-proprietary lock-in. Optimized for ROCm and indigenous Shakti/Vega processor target toolchains.
            </p>
            <div className="flex gap-4 text-[10px] font-mono text-[#2563eb] pt-1">
              <span>• Multi-Arch: Supported</span>
              <span>• Zero Cloud Handshake</span>
            </div>
          </div>

          {/* Card 3: Make in India AI Compliance */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#2563eb]">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-[#0b1c30]">
                  Make in India AI Compliance
                </h4>
              </div>
              <span className="bg-[#fef3c7] text-[#92400e] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                MeitY • BIS
              </span>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Full alignment with Bureau of Indian Standards (BIS) AI Trustworthiness framework and MeitY Sovereign Intelligence mandates. Bypasses prohibitive foreign software subscriptions exceeding ₹80 Lakhs/year.
            </p>
            <div className="flex gap-4 text-[10px] font-mono text-[#2563eb] pt-1">
              <span>• 100% Indian IPR</span>
              <span>• Cost Reduction: 92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Export Forensic Report & Big Action Button matching Image 7 */}
      <div className="bg-[#eff4ff] rounded-2xl p-5 border border-[#dce9ff] space-y-3.5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">
              Export Forensic Report
            </h3>
            <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
              Generate an EC-P256 cryptographically signed comparative brief for jury inspection and procurement tenders.
            </p>
          </div>
          <Download className="w-5 h-5 text-[#2563eb] shrink-0" />
        </div>

        <button
          onClick={onOpenDossier}
          className="w-full bg-[#0b1c30] hover:bg-[#131b2e] text-white font-bold py-3.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.99]"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Generate Signed Defense Audit Dossier</span>
        </button>
      </div>
    </div>
  );
};
