import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Play,
  RotateCcw,
  Download,
  Lock,
  ArrowRight,
  ShieldAlert,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Check,
  FileText,
} from 'lucide-react';
import { TACTICAL_BENCHMARKS } from '../data/mockDefenseData';
import { TensorGrid } from '../components/TensorGrid';
import { TacticalBenchmark } from '../types';

interface LiveDemoViewProps {
  onOpenDossier: () => void;
  onNavigateToArch: () => void;
}

export const LiveDemoView: React.FC<LiveDemoViewProps> = ({
  onOpenDossier,
  onNavigateToArch,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBenchmark, setSelectedBenchmark] = useState<TacticalBenchmark>(TACTICAL_BENCHMARKS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [selectedAttacks, setSelectedAttacks] = useState<string[]>([
    'backdoor_checkerboard',
    'label_flipping',
  ]);

  const steps = [
    { num: 1, label: 'Dataset' },
    { num: 2, label: 'Attacks' },
    { num: 3, label: 'Execute' },
    { num: 4, label: 'Findings' },
    { num: 5, label: 'Export' },
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setCurrentStep(4);
          return 100;
        }
        return prev + 20;
      });
    }, 280);
  };

  const toggleAttack = (attackKey: string) => {
    setSelectedAttacks((prev) =>
      prev.includes(attackKey) ? prev.filter((a) => a !== attackKey) : [...prev, attackKey]
    );
  };

  return (
    <div className="space-y-5 pb-24 max-w-2xl mx-auto px-4 pt-2">
      {/* 1. Engine & GPU Status Ribbon matching Image 3 */}
      <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-xl px-3.5 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-[#0b1c30]">
          <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
          <span className="font-bold tracking-tight">ENGINE: PYTORCH-CV 2.4-SANDBOXED</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#2563eb] font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>GPU Node: #04 (0.8ms/inf)</span>
        </div>
      </div>

      {/* 2. 5-Step Stepper Bar matching Image 3 */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-2xs">
        <div className="flex items-center justify-between relative px-2">
          {/* Connector Line behind steps */}
          <div className="absolute left-6 right-6 top-3.5 h-0.5 bg-[#e2e8f0] -z-0"></div>
          <div
            className="absolute left-6 top-3.5 h-0.5 bg-[#2563eb] -z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 90}%` }}
          ></div>

          {steps.map((st) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <button
                key={st.num}
                onClick={() => setCurrentStep(st.num)}
                className="flex flex-col items-center z-10 group"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#2563eb] text-white shadow-sm ring-4 ring-blue-100 scale-105'
                      : isCompleted
                      ? 'bg-[#2563eb] text-white'
                      : 'bg-white border-2 border-[#cbd5e1] text-[#64748b]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.num}
                </div>
                <span
                  className={`text-[10px] mt-1 tracking-tight font-medium ${
                    isCurrent
                      ? 'font-bold text-[#2563eb]'
                      : isCompleted
                      ? 'text-[#0b1c30]'
                      : 'text-[#64748b]'
                  }`}
                >
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Dataset & Tensor Partition */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
                STEP 01 / PIPELINE INTAKE
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0b1c30]">
                Select Tactical Benchmark
              </h2>
            </div>
            <span className="bg-[#eff4ff] text-[#2563eb] border border-[#dce9ff] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              Live Shard
            </span>
          </div>

          {/* Preloaded Telemetry Feeds list */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider block">
              Preloaded Telemetry Feeds
            </span>

            {TACTICAL_BENCHMARKS.map((benchmark) => {
              const isSelected = selectedBenchmark.id === benchmark.id;
              return (
                <div
                  key={benchmark.id}
                  onClick={() => setSelectedBenchmark(benchmark)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#eff4ff]/60 border-[#2563eb] shadow-xs'
                      : 'bg-white border-[#e2e8f0] hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#2563eb] text-white' : 'bg-[#eff4ff] text-[#2563eb]'
                      }`}
                    >
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                        {benchmark.name}
                      </h4>
                      <p className="text-[11px] text-[#64748b]">
                        {benchmark.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2563eb] fill-blue-50" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#cbd5e1]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tensor Sample Partition (Image 3 core heatmap) */}
          <TensorGrid />

          {/* Step 1 CTA */}
          <button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-[#0b1c30] hover:bg-[#131b2e] text-white font-bold py-3.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <span>Lock Dataset &amp; Configure Attacks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Configure Attacks */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
                STEP 02 / ADVERSARIAL HARNESS
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0b1c30]">
                Simulate Defense Attack Vectors
              </h2>
            </div>
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              4 Vectors Ready
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 'backdoor_checkerboard',
                title: 'Stealth Trojan Patch (14x14 Checkerboard)',
                desc: 'Injects high-frequency checkerboard pattern to force target misclassification as friendly.',
                risk: 'CRITICAL',
              },
              {
                id: 'label_flipping',
                title: 'Clean-Label Class Inversion',
                desc: 'Corrupts training annotations from Hostile Combatant to Civilian Neutral.',
                risk: 'HIGH',
              },
              {
                id: 'spectral_noise',
                title: 'Fourier Spectral Jitter (k_x/k_y)',
                desc: 'Embeds imperceptible high-frequency sinusoidal perturbation across edge sensors.',
                risk: 'MEDIUM',
              },
              {
                id: 'weight_poisoning',
                title: 'Model Checkpoint Weight Perturbation',
                desc: 'Substitutes layer 4 convolutional weights during FPGA bitstream flash.',
                risk: 'CRITICAL',
              },
            ].map((atk) => {
              const active = selectedAttacks.includes(atk.id);
              return (
                <div
                  key={atk.id}
                  onClick={() => toggleAttack(atk.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                    active
                      ? 'bg-rose-50/60 border-rose-300 shadow-2xs'
                      : 'bg-white border-[#e2e8f0] opacity-80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0b1c30]">{atk.title}</span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          atk.risk === 'CRITICAL'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {atk.risk}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#45464d]">{atk.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={active}
                    readOnly
                    className="mt-1 w-4 h-4 rounded text-[#2563eb] accent-[#2563eb]"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex-1 bg-white border border-[#cbd5e1] hover:bg-[#f8f9ff] text-[#0b1c30] font-semibold py-3 px-4 rounded-xl text-xs"
            >
              Back to Shard
            </button>
            <button
              onClick={() => {
                setCurrentStep(3);
                handleStartScan();
              }}
              className="flex-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-4 rounded-xl shadow-xs text-xs flex items-center justify-center gap-2"
            >
              <span>Execute Air-Gapped Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Execute Air-Gap Verification */}
      {currentStep === 3 && (
        <div className="space-y-4 bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
              STEP 03 / DETERMINISTIC AUDIT
            </span>
            <h2 className="text-base font-bold text-[#0b1c30]">
              Executing Sovereign Air-Gap Inspection
            </h2>
            <p className="text-xs text-[#64748b]">
              Hashing Merkle roots, decomposing 2D Fourier spectra, and validating TPM PCR-04
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#0b1c30] font-bold">Inspection Status:</span>
              <span className="text-[#2563eb] font-bold">{scanProgress}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-[#eff4ff] rounded-full overflow-hidden border border-[#dce9ff]">
              <div
                className="h-full bg-[#2563eb] rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Live Terminal Log Stream */}
          <div className="bg-[#0b1c30] rounded-xl p-3.5 text-[11px] font-mono text-emerald-400 space-y-1.5 shadow-inner">
            <div className="flex items-center gap-1.5 text-slate-400 pb-1 border-b border-slate-700">
              <Terminal className="w-3.5 h-3.5" />
              <span>AIR-GAP FORENSIC KERNEL v4.2</span>
            </div>
            <p className="text-slate-300">[0.00ms] Ingesting 60 MS-COCO bounding box coordinate maps...</p>
            <p className="text-slate-300">[0.12ms] SHA-256 Merkle root computation: 0xfa3991c08be3...</p>
            <p className="text-purple-300">[0.35ms] Running 2D Fourier decomposition across 60 spectral channels...</p>
            <p className="text-rose-400 font-bold">[0.58ms] ALERT: 14x14 high-freq anomaly flagged at Contributor B Frame #33!</p>
            <p className="text-emerald-400 font-semibold">[0.82ms] TPM PCR-04 hardware seal verified: 100% genuine enclave.</p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentStep(4)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs flex items-center gap-2"
            >
              <span>View Audit Findings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Findings */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
                STEP 04 / FORENSIC FINDINGS
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#0b1c30]">
                Tainted Artifacts Quarantined
              </h2>
            </div>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-rose-200">
              5 Isolated
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c30]">Tainted Batch Breakdown</span>
              <span className="text-[11px] font-mono text-[#64748b]">P-Value: 0.0003</span>
            </div>

            <div className="space-y-2">
              {[
                { id: 'C-B #33', attack: 'Trojan Checkerboard Patch (14x14)', p: '0.0003', status: 'QUARANTINED' },
                { id: 'C-B #22', attack: 'Label Flipping (Hostile -> Civilian)', p: '0.0011', status: 'QUARANTINED' },
                { id: 'C-B #26', attack: 'Fourier High-Freq Perturbation', p: '0.0008', status: 'QUARANTINED' },
                { id: 'C-B #31', attack: 'Adversarial Gaussian Stride', p: '0.0019', status: 'QUARANTINED' },
                { id: 'C-B #47', attack: 'Clean-Label Feature Distortion', p: '0.0024', status: 'QUARANTINED' },
              ].map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 bg-[#f8f9ff] rounded-xl border border-rose-100 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-rose-600">{item.id}</span>
                    <span className="text-[#0b1c30] text-[11px] font-sans font-medium">{item.attack}</span>
                  </div>
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] text-xs text-[#0b1c30] flex items-center justify-between">
              <span className="font-medium">Clean Batches (Contributor A):</span>
              <span className="font-bold text-[#059669]">55/60 Frames Verified (100% Pass)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onNavigateToArch}
              className="flex-1 bg-white border border-[#cbd5e1] hover:bg-[#f8f9ff] text-[#0b1c30] font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <span>Inspect Architecture</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-4 rounded-xl shadow-xs text-xs flex items-center justify-center gap-1.5"
            >
              <span>Proceed to Export</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Export Cryptographic Dossier */}
      {currentStep === 5 && (
        <div className="space-y-4 bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#059669] uppercase tracking-wider block">
              STEP 05 / CERTIFIED ATTESTATION
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#0b1c30]">
              Attestation Sealed with EC-P256
            </h2>
            <p className="text-xs text-[#64748b]">
              Ready for military trial admissibility and DRDO tender qualification
            </p>
          </div>

          <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#dce9ff] space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Certificate ID:</span>
              <span className="font-bold text-[#0b1c30]">AegisLens-2024-DF91</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Signer:</span>
              <span className="text-[#2563eb] font-bold">DRDO CAIR Root Enclave (TPM 2.0)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Algorithm:</span>
              <span className="font-bold text-[#0b1c30]">ECDSA NIST P-256 + SHA-256</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={onOpenDossier}
              className="w-full bg-[#0b1c30] hover:bg-[#131b2e] text-white font-bold py-3.5 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs transition-all"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Open Signed Defense Audit Dossier</span>
            </button>

            <button
              onClick={() => setCurrentStep(1)}
              className="w-full bg-white border border-[#cbd5e1] hover:bg-[#f8f9ff] text-[#45464d] font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset &amp; Test Another Benchmark</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
