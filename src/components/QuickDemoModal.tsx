import React, { useState } from 'react';
import { X, ShieldCheck, Zap, ChevronRight, CheckCircle2, Play, Lock, FileText, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface QuickDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const QuickDemoModal: React.FC<QuickDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'The National Defense AI Vulnerability',
      subtitle: 'Why DRDO & Armed Forces Face Stealth Pipeline Compromises',
      badge: 'THREAT MODEL',
      badgeColor: 'bg-rose-100 text-rose-800',
      description:
        'Modern defense platforms procure satellite data from Vendor A, neural models from Vendor B, and edge FPGA boxes from Vendor C. A rogue vendor can plant a 14×14 pixel checkerboard sticker on tanks, causing target classifiers to misidentify hostile combatants as civilian buses.',
      highlight: 'Standard unit tests pass with 99% accuracy because the trigger is only active under specific patch conditions.',
      actionLabel: 'See How AegisLens Catches It',
    },
    {
      title: 'AegisLens Solution: Zero-Cloud Cryptographic Proof',
      subtitle: 'End-to-End Cryptographic Pedigree & Spectral Audit',
      badge: 'SOVEREIGN INNOVATION',
      badgeColor: 'bg-blue-100 text-blue-800',
      description:
        'AegisLens introduces 2D Fourier frequency domain inversion to discover latent patch triggers without training epochs, coupled with hardware TPM PCR-04 cryptographic signing for every single frame and inference output.',
      highlight: '100% air-gapped, zero cloud dependencies, running in sub-millisecond (0.8ms) latency directly on edge silicon.',
      actionLabel: 'Explore Interactive Demo',
    },
    {
      title: 'Jury & Evaluator Inspection Sandbox',
      subtitle: 'Verified Readiness for SIH 2024 Grand Finale',
      badge: 'EVALUATION READY',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description:
        'Test preloaded tactical benchmarks (Border Surveillance, Micro-UAVs, Smart Perimeter), trigger automated air-gap verification scans, isolate tainted vendor batches, and export EC-P256 signed audit dossiers.',
      highlight: 'Compliant with MeitY AI Trustworthiness Framework, Bureau of Indian Standards (BIS), and Defence Cyber Agency DCA-2023.',
      actionLabel: 'Launch Live Sandbox',
    },
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      onNavigate('demo');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0b1c30] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm tracking-wide">AegisLens Executive Brief</h3>
                <span className="bg-[#fef3c7] text-[#92400e] text-[9px] font-bold px-1.5 py-0.5 rounded">
                  SIH 2024
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Smart India Hackathon Defense Track</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-5 pt-4 pb-1 flex items-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i === currentStep
                  ? 'bg-[#2563eb]'
                  : i < currentStep
                  ? 'bg-blue-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${step.badgeColor}`}>
              {step.badge}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              STEP 0{currentStep + 1} OF 03
            </span>
          </div>

          <h2 className="text-lg font-bold text-[#0b1c30] leading-snug">
            {step.title}
          </h2>
          <p className="text-xs font-medium text-[#2563eb] mt-0.5">
            {step.subtitle}
          </p>

          <p className="text-xs text-[#45464d] leading-relaxed mt-3">
            {step.description}
          </p>

          <div className="mt-3 p-3 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
            <p className="text-[11px] font-medium text-[#0b1c30] leading-normal">
              {step.highlight}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f8f9ff] px-5 py-3 border-t border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-semibold text-[#45464d] hover:text-[#0b1c30]"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                onClose();
                onNavigate('matrix');
              }}
              className="text-xs font-medium text-[#64748b] hover:text-[#2563eb]"
            >
              Skip to Matrix
            </button>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all"
          >
            <span>{step.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
