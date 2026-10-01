import React, { useState } from 'react';
import {
  Layers,
  Shield,
  ShieldAlert,
  Cpu,
  Lock,
  CheckCircle2,
  FileCode,
  FileText,
  Copy,
  Check,
  Code2,
  Radio,
  Sparkles,
  ArrowDown,
  Terminal,
  Info,
} from 'lucide-react';
import { VisualViewport } from '../components/VisualViewport';
import { MOCK_EVIDENCE_OBJECT, GROUNDBREAKING_CONTRIBUTIONS } from '../data/mockDefenseData';

interface ArchitectureViewProps {
  onOpenDossier: () => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onOpenDossier }) => {
  const [accessBoundary, setAccessBoundary] = useState<'black' | 'grey' | 'white'>('grey');
  const [visualizerMode, setVisualizerMode] = useState<'structured' | 'json'>('structured');
  const [isQuarantined, setIsQuarantined] = useState<boolean>(true);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [copiedJSON, setCopiedJSON] = useState<boolean>(false);

  const evidence = MOCK_EVIDENCE_OBJECT;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(evidence, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto px-4 pt-3">
      {/* 1. Header & Operational Level */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#eff4ff] border border-[#dce9ff] text-[#2563eb] text-xs font-semibold px-3 py-1 rounded-full shadow-2xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
          <span>SEC-LEVEL 4 • Pipeline Operational</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
          Solution Architecture &amp; Evidence Inspector
        </h1>
        <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
          Autonomous tamper-resistant verification engine mapping untrusted multi-modal vision inputs to cryptographically anchored attestation certificates.
        </p>
      </div>

      {/* 2. Inspection Access Boundaries (Interactive radio) matching Image 5 */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-[#64748b] tracking-wider uppercase">
            INSPECTION ACCESS BOUNDARIES
          </span>
          <Info className="w-3.5 h-3.5 text-[#64748b]" />
        </div>

        <div className="space-y-2">
          {/* Black-Box Mode */}
          <div
            onClick={() => setAccessBoundary('black')}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
              accessBoundary === 'black'
                ? 'bg-[#eff4ff]/60 border-[#2563eb] shadow-2xs'
                : 'bg-white border-[#e2e8f0] hover:bg-[#f8f9ff]'
            }`}
          >
            <div className="mt-0.5">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                  accessBoundary === 'black'
                    ? 'border-[#2563eb] bg-[#2563eb]'
                    : 'border-[#cbd5e1] bg-white'
                }`}
              >
                {accessBoundary === 'black' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block">
                Black-Box Mode
              </span>
              <span className="text-[11px] text-[#45464d]">
                Logits &amp; output inference predictions only
              </span>
            </div>
          </div>

          {/* Grey-Box Mode */}
          <div
            onClick={() => setAccessBoundary('grey')}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
              accessBoundary === 'grey'
                ? 'bg-[#eff4ff]/60 border-[#2563eb] shadow-2xs'
                : 'bg-white border-[#e2e8f0] hover:bg-[#f8f9ff]'
            }`}
          >
            <div className="mt-0.5">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                  accessBoundary === 'grey'
                    ? 'border-[#2563eb] bg-[#2563eb]'
                    : 'border-[#cbd5e1] bg-white'
                }`}
              >
                {accessBoundary === 'grey' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block">
                Grey-Box Mode
              </span>
              <span className="text-[11px] text-[#45464d]">
                Weights, layer graph &amp; feature activations (no backprop required)
              </span>
            </div>
          </div>

          {/* White-Box Mode */}
          <div
            onClick={() => setAccessBoundary('white')}
            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
              accessBoundary === 'white'
                ? 'bg-[#eff4ff]/60 border-[#2563eb] shadow-2xs'
                : 'bg-white border-[#e2e8f0] hover:bg-[#f8f9ff]'
            }`}
          >
            <div className="mt-0.5">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                  accessBoundary === 'white'
                    ? 'border-[#2563eb] bg-[#2563eb]'
                    : 'border-[#cbd5e1] bg-white'
                }`}
              >
                {accessBoundary === 'white' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b1c30] block">
                White-Box Mode
              </span>
              <span className="text-[11px] text-[#45464d]">
                Full Jacobian gradients, latent tensors &amp; checkpoint parameter tensors
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hexa-Layer Flow: End-to-End Pipeline Stack matching Image 5 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
              HEXA-LAYER FLOW
            </span>
            <h3 className="text-base font-bold text-[#0b1c30]">
              End-to-End Pipeline Stack
            </h3>
          </div>
          <span className="bg-[#eff4ff] text-[#2563eb] border border-[#dce9ff] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
            Telemetry Stream
          </span>
        </div>

        {/* 6 Sequential Layers with downward connecting arrows */}
        <div className="space-y-2">
          {/* Layer 01: Ingestion Ingress */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#0b1c30] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  01
                </span>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">
                  INGESTION INGRESS
                </span>
              </div>
              <span className="bg-[#eff4ff] text-[#2563eb] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                RAW_BLOB
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Input Sources Layer</h4>
            <p className="text-[11px] text-[#45464d]">
              Heterogeneous untrusted datasets, serialized model packages, and manifest declarations.
            </p>
            <div className="flex gap-1.5 pt-1">
              <span className="bg-[#f8f9ff] border border-[#e2e8f0] text-[10px] font-mono px-2 py-0.5 rounded text-[#0b1c30]">
                COCO / YOLO
              </span>
              <span className="bg-[#f8f9ff] border border-[#e2e8f0] text-[10px] font-mono px-2 py-0.5 rounded text-[#0b1c30]">
                ONNX / Torch
              </span>
              <span className="bg-[#f8f9ff] border border-[#e2e8f0] text-[10px] font-mono px-2 py-0.5 rounded text-[#0b1c30]">
                YAML Schemas
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-1 text-[#cbd5e1]">
            <ArrowDown className="w-4 h-4 text-[#2563eb]" />
          </div>

          {/* Layer 02: Standardization */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#2563eb] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  02
                </span>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">
                  STANDARDIZATION
                </span>
              </div>
              <span className="bg-[#ecfdf5] text-[#059669] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                SANITIZED
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Ingestor &amp; Preprocessor</h4>
            <p className="text-[11px] text-[#45464d]">
              Decouples raw vendor encodings into unified geometric bounding frames and immutable tensor streams.
            </p>
            <div className="space-y-1 text-[11px] font-mono text-[#45464d] bg-[#f8f9ff] p-2 rounded-lg border border-[#f1f5f9]">
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">COCOIngestor</span>
                <span className="text-[#64748b]">JSON Segments &amp; BBox</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">YOLOIngestor</span>
                <span className="text-[#64748b]">Normalized XYWH coords</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">ModelIngestor</span>
                <span className="text-[#64748b]">Static Graph Analysis</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-1 text-[#cbd5e1]">
            <ArrowDown className="w-4 h-4 text-[#2563eb]" />
          </div>

          {/* Layer 03: Zero-Trust Analysis */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#0b1c30] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  03
                </span>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">
                  ZERO-TRUST ANALYSIS
                </span>
              </div>
              <span className="bg-[#fee2e2] text-[#dc2626] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                PARALLEL (5)
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Core Detection Modules</h4>
            <p className="text-[11px] text-[#45464d]">
              Isolated deterministic inspection units scanning for latent contamination and malicious artifacts.
            </p>
            <div className="space-y-1 text-[11px] font-mono text-[#45464d]">
              <div className="flex justify-between items-center bg-[#f8f9ff] p-1.5 rounded">
                <span className="flex items-center gap-1.5 font-semibold text-[#0b1c30]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  NearDuplicateDetector
                </span>
                <span className="text-[#64748b] text-[10px]">pHash + SimHash</span>
              </div>
              <div className="flex justify-between items-center bg-[#f8f9ff] p-1.5 rounded">
                <span className="flex items-center gap-1.5 font-semibold text-[#0b1c30]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  LabelValidator
                </span>
                <span className="text-[#64748b] text-[10px]">Cleanlab Confident</span>
              </div>
              <div className="flex justify-between items-center bg-rose-50 p-1.5 rounded border border-rose-200">
                <span className="flex items-center gap-1.5 font-semibold text-rose-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  BackdoorDetector
                </span>
                <span className="text-rose-700 font-bold text-[10px]">ACTIVE SCAN</span>
              </div>
              <div className="flex justify-between items-center bg-[#f8f9ff] p-1.5 rounded">
                <span className="flex items-center gap-1.5 font-semibold text-[#0b1c30]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  OODDetector
                </span>
                <span className="text-[#64748b] text-[10px]">Mahalanobis Rank</span>
              </div>
              <div className="flex justify-between items-center bg-[#f8f9ff] p-1.5 rounded">
                <span className="flex items-center gap-1.5 font-semibold text-[#0b1c30]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  ModelFingerprinter
                </span>
                <span className="text-[#64748b] text-[10px]">Weight Hashing</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-1 text-[#cbd5e1]">
            <ArrowDown className="w-4 h-4 text-[#2563eb]" />
          </div>

          {/* Layer 04: Attestation Math */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#0b1c30] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  04
                </span>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">
                  ATTESTATION MATH
                </span>
              </div>
              <span className="bg-[#eff4ff] text-[#2563eb] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                DEEP_AUDIT
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Advanced Verification</h4>
            <p className="text-[11px] text-[#45464d]">
              Heuristic inversion and parametric adversarial hypothesis confirmation.
            </p>
            <div className="space-y-1 text-[11px] font-mono bg-[#f8f9ff] p-2 rounded-lg border border-[#f1f5f9]">
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">TriggerSearcher</span>
                <span className="text-[#64748b]">Fourier Spectrum Inversion</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">DistributionShiftDetector</span>
                <span className="text-[#64748b]">Wasserstein Distance</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">ChainVerifier</span>
                <span className="text-[#64748b]">Merkle Ancestry Proof</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-1 text-[#cbd5e1]">
            <ArrowDown className="w-4 h-4 text-[#2563eb]" />
          </div>

          {/* Layer 05: Unified Synthesis */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#2563eb] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  05
                </span>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">
                  UNIFIED SYNTHESIS
                </span>
              </div>
              <span className="bg-[#eff4ff] text-[#2563eb] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                RFC-9442
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Evidence Aggregator</h4>
            <p className="text-[11px] text-[#45464d]">
              Collates disjoint telemetry into a single sovereign attestation payload linked to supplier identity.
            </p>
            <div className="space-y-1 text-[11px] font-mono bg-[#f8f9ff] p-2 rounded-lg border border-[#f1f5f9]">
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">Unified Evidence Schema</span>
                <span className="text-[#64748b]">Deterministic canonical payload</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#0b1c30]">ContributorAggregator</span>
                <span className="text-[#64748b]">Bayesian supplier culpability</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-1 text-[#cbd5e1]">
            <ArrowDown className="w-4 h-4 text-[#2563eb]" />
          </div>

          {/* Layer 06: Cryptographic Anchor */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#0b1c30] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  06
                </span>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">
                  CRYPTOGRAPHIC ANCHOR
                </span>
              </div>
              <span className="bg-[#ecfdf5] text-[#059669] text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                CERTIFIED
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#0b1c30]">Verifiable Outputs</h4>
            <p className="text-[11px] text-[#45464d]">
              Immutable legal and judicial audit manifests sealed with HMAC-SHA256 and Ed25519 signatures.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={onOpenDossier}
                className="flex-1 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#dce9ff] text-[#0b1c30] text-[10px] font-mono font-semibold py-1.5 px-2 rounded-lg text-center"
              >
                Tamper Audit
              </button>
              <button
                onClick={() => setVisualizerMode('json')}
                className="flex-1 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#dce9ff] text-[#0b1c30] text-[10px] font-mono font-semibold py-1.5 px-2 rounded-lg text-center"
              >
                JSON Payload
              </button>
              <button
                onClick={onOpenDossier}
                className="flex-1 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#dce9ff] text-[#0b1c30] text-[10px] font-mono font-semibold py-1.5 px-2 rounded-lg text-center"
              >
                Exec Brief
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Telemetry Inspector: Evidence Object Visualizer matching Image 5 */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
              LIVE TELEMETRY INSPECTOR
            </span>
            <h3 className="text-base font-bold text-[#0b1c30]">
              Evidence Object Visualizer
            </h3>
          </div>
          <span className="bg-[#0b1c30] text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE NODE
          </span>
        </div>

        {/* View Switcher: [Structured UI] and [<> JSON Attestation] */}
        <div className="flex border-b border-[#e2e8f0] pb-2 gap-2">
          <button
            onClick={() => setVisualizerMode('structured')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              visualizerMode === 'structured'
                ? 'bg-[#eff4ff] text-[#2563eb] border border-[#dce9ff]'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Structured UI</span>
          </button>

          <button
            onClick={() => setVisualizerMode('json')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              visualizerMode === 'json'
                ? 'bg-[#eff4ff] text-[#2563eb] border border-[#dce9ff]'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>&lt;&gt; JSON Attestation</span>
          </button>
        </div>

        {visualizerMode === 'structured' ? (
          <div className="space-y-3.5">
            {/* Evidence ID & Status Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-[#64748b]">evidence_id</span>
                <span className="font-bold text-[#0b1c30]">{evidence.evidenceId}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="bg-[#fee2e2] text-[#b91c1c] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  SEV: CRITICAL
                </span>
                <span className="bg-[#fee2e2] text-[#b91c1c] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  BACKDOOR_TRIGGER
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {isQuarantined ? 'QUARANTINE' : 'RELEASED'}
                </span>
              </div>
            </div>

            {/* Confidence Score Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#0b1c30] font-bold">Attestation Confidence Score</span>
                <span className="text-[#2563eb] font-bold">{evidence.confidenceScore}%</span>
              </div>
              <div className="w-full h-2 bg-[#e5eeff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563eb] rounded-full"
                  style={{ width: `${evidence.confidenceScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#64748b]">
                <span>Threshold: {evidence.threshold}%</span>
                <span className="text-[#b91c1c] font-semibold">P-Value: {evidence.pValue} (Deterministic)</span>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#64748b] tracking-wider uppercase block">
                ROOT CAUSE ANOMALY DIAGNOSIS
              </span>
              <p className="text-xs text-[#0b1c30] leading-relaxed bg-[#f8f9ff] p-2.5 rounded-xl border border-[#e2e8f0]">
                {evidence.diagnosis}
              </p>
            </div>

            {/* Contaminated Sample Viewport with Bounding Box & Fourier Trigger */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#64748b] tracking-wider uppercase block">
                CONTAMINATED SAMPLE VIEWPORT
              </span>
              <VisualViewport type="road_trigger" className="h-44 sm:h-52" />
            </div>

            {/* Metadata Fields */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-[#f1f5f9] pb-1.5">
                <span className="text-[#64748b]">ASSET ID</span>
                <span className="text-[#0b1c30] font-semibold">{evidence.assetId}</span>
              </div>

              <div className="flex justify-between border-b border-[#f1f5f9] pb-1.5 items-center">
                <span className="text-[#64748b]">CONTRIBUTOR ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0b1c30] font-semibold">{evidence.contributorId}</span>
                  <span className="bg-[#fee2e2] text-[#b91c1c] text-[10px] font-bold px-1.5 py-0.2 rounded">
                    HIGH RISK
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-b border-[#f1f5f9] pb-1.5">
                <span className="text-[#64748b]">DETECTOR IMPLEMENTATION</span>
                <span className="text-[#0b1c30] text-[11px]">{evidence.detectorImplementation}</span>
              </div>
            </div>

            {/* Attestation Scope Limitations */}
            <div className="space-y-1 bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-[11px] text-[#45464d]">
              <span className="font-mono font-bold text-[#2563eb] text-[10px] uppercase block">
                ATTESTATION SCOPE LIMITATIONS
              </span>
              <div className="space-y-1 mt-1">
                <div className="flex items-start gap-1.5">
                  <span className="text-[#2563eb] font-bold">ⓘ</span>
                  <span>Only covers static triggers (affine transforms unverified)</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#2563eb] font-bold">ⓘ</span>
                  <span>Clean-label poisoning excluded from current search radius</span>
                </div>
              </div>
            </div>

            {/* Actions: [Isolate Sample] and [Receipt] */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setIsQuarantined(!isQuarantined)}
                className={`flex-1 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all ${
                  isQuarantined
                    ? 'bg-[#b91c1c] hover:bg-[#991b1b] text-white shadow-xs'
                    : 'bg-[#059669] hover:bg-[#047857] text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isQuarantined ? 'Quarantined (Tap to Release)' : 'Isolate Sample'}</span>
              </button>

              <button
                onClick={() => setShowReceiptModal(true)}
                className="flex-1 bg-white hover:bg-[#f8f9ff] border border-[#cbd5e1] text-[#0b1c30] font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <FileCode className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        ) : (
          /* JSON Attestation Mode */
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#64748b]">RFC-9442 JSON-LD SCHEMA</span>
              <button
                onClick={handleCopyJSON}
                className="flex items-center gap-1 text-[#2563eb] hover:underline"
              >
                {copiedJSON ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedJSON ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="bg-[#0b1c30] text-emerald-400 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-96 leading-relaxed">
              {JSON.stringify(evidence, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 5. Scientific Rigor: 5 Groundbreaking Contributions matching Image 5 */}
      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#2563eb] uppercase tracking-wider block">
            SCIENTIFIC RIGOR
          </span>
          <h3 className="text-base font-bold text-[#0b1c30]">
            5 Groundbreaking Contributions
          </h3>
          <p className="text-xs text-[#64748b] mt-0.5">
            Core algorithmic advances setting sovereign benchmarks in verifiable AI inference.
          </p>
        </div>

        <div className="space-y-2.5">
          {GROUNDBREAKING_CONTRIBUTIONS.map((item) => (
            <div
              key={item.number}
              className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#2563eb]">
                <span className="font-bold">{item.number} // {item.category}</span>
                <Sparkles className="w-3 h-3" />
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                {item.title}
              </h4>

              <p className="text-xs text-[#45464d] leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.badges.map((b) => (
                  <span
                    key={b}
                    className="bg-[#eff4ff] text-[#2563eb] border border-[#dce9ff] text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Enclave Attestation Footer Card matching Image 5 */}
      <div className="bg-[#0b1c30] text-white rounded-xl p-3.5 flex items-center justify-between text-xs font-mono shadow-md">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="font-bold flex items-center gap-1.5">
              <span>Enclave Attestation:</span>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </div>
            <span className="text-[10px] text-slate-400 block truncate max-w-xs">
              PCR[04]: 7b1c4e92... Signed by AegisLens Root TPM
            </span>
          </div>
        </div>
        <button
          onClick={onOpenDossier}
          className="text-xs text-blue-400 hover:text-white font-semibold underline"
        >
          Verify
        </button>
      </div>

      {/* Receipt Modal Popup */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#cbd5e1] space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-sm text-[#0b1c30]">Attestation Receipt</h4>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-slate-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1.5 text-xs font-mono text-[#0b1c30]">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Receipt ID:</span>
                <span className="font-bold">RCPT-2024-0914-99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Evidence Hash:</span>
                <span className="text-[#2563eb]">0x78ab12ff89cd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Timestamp:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Status:</span>
                <span className="text-rose-600 font-bold">QUARANTINED</span>
              </div>
            </div>
            <p className="text-[10px] text-[#45464d] bg-[#f8f9ff] p-2 rounded border border-[#e2e8f0]">
              This cryptographically verifiable receipt proves that Frame #33 was quarantined due to a Trojan checkerboard trigger.
            </p>
            <button
              onClick={() => setShowReceiptModal(false)}
              className="w-full bg-[#0b1c30] text-white py-2 rounded-xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
