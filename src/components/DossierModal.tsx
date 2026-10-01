import React, { useState } from 'react';
import { X, ShieldCheck, Download, Printer, Check, Copy, Key, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_EVIDENCE_OBJECT } from '../data/mockDefenseData';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const dossierData = {
    documentTitle: 'SOVEREIGN DEFENSE AI CRYPTOGRAPHIC AUDIT DOSSIER',
    classification: 'RESTRICTED // DRDO-CAIR & TRI-SERVICES ARCHIVE',
    protocolVersion: 'AegisLens-STD-v4.2-RFC9442',
    issueTimestamp: new Date().toISOString(),
    hardwareAnchor: {
      platform: 'Param Rudra Defense AI Cluster',
      cryptoEngine: 'Hardware TPM 2.0 / Shakti Processor C-Class',
      pcrIndex: 'PCR[04]',
      pcrHash: '7b1c4e92aa84f180c449102c77d61b6910a3014c9c1b981f215091a1',
      ecdsaSignature: '3045022100e4b85c138d8ff55fa98c253457a3980183b169527ec3c3062fa9c394c8e76da402202685718a1bfbaea123497e88c0aef4847ad8f8cfec3505cf46cfcd7a65977ba2',
      merkleRoot: '0xfa3991c08be339d1b0928e811cd48895029cba48398ff019028823aa084c8188'
    },
    inspectionSummary: {
      tacticalBenchmark: 'Border Surveillance Forward Post #04',
      totalFramesEvaluated: 60,
      quarantinedTaintedFrames: 5,
      cleanVerifiedFrames: 55,
      complianceRate: '100.0%',
      latencyP99: '0.82ms',
      isolationStatus: 'PARADAY_ENCLAVE_ZERO_EGRESS'
    },
    quarantineLog: [
      { id: 'C-B #33', asset: 'dataset/coco_train_v2/img_042.jpg', vector: 'Trojan Checkerboard Patch (14x14)', pValue: 0.0003 },
      { id: 'C-B #22', asset: 'dataset/coco_train_v2/img_029.jpg', vector: 'Label Flipping (Hostile -> Civilian)', pValue: 0.0011 },
      { id: 'C-B #26', asset: 'dataset/coco_train_v2/img_035.jpg', vector: 'Fourier High-Freq Perturbation', pValue: 0.0008 },
      { id: 'C-B #31', asset: 'dataset/coco_train_v2/img_040.jpg', vector: 'Adversarial Gaussian Stride', pValue: 0.0019 },
      { id: 'C-B #47', asset: 'dataset/coco_train_v2/img_058.jpg', vector: 'Clean-Label Feature Distortion', pValue: 0.0024 }
    ],
    authorizingAuthority: 'Defence Cyber Agency (DCA) & Centre for AI & Robotics (CAIR)'
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(dossierData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden my-6">
        {/* Top Military Banner */}
        <div className="bg-[#0b1c30] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide text-white">
                Sovereign Defense AI Dossier
              </h3>
              <span className="text-[10px] text-amber-400 font-mono tracking-wider font-semibold">
                RESTRICTED // DRDO-CAIR VERIFIED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1 text-[11px] font-mono bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'JSON'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 text-[11px] font-mono bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md transition-colors"
            >
              <Printer className="w-3 h-3" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4 text-xs font-sans text-[#0b1c30]">
          {/* Header block */}
          <div className="border-b border-[#e2e8f0] pb-3 text-center">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#2563eb] uppercase block mb-1">
              Ministry of Defence • Defence Cyber Agency
            </span>
            <h2 className="text-base font-extrabold tracking-tight text-[#0b1c30]">
              CRYPTOGRAPHIC EVALUATION & ATTESTATION REPORT
            </h2>
            <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-[#64748b] mt-1">
              <span>REF: AegisLens-2024-DF91</span>
              <span>•</span>
              <span>NODE: SHAKTI-PARAM-04</span>
              <span>•</span>
              <span>DATE: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Cryptographic Seal Grid */}
          <div className="bg-[#f8f9ff] p-3.5 rounded-xl border border-[#dce9ff] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0b1c30]">
              <Key className="w-4 h-4 text-[#2563eb]" />
              <span>Hardware Root-of-Trust Attestation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-white p-2 rounded border border-[#e2e8f0]">
                <span className="text-[#64748b] text-[10px] block">NIST EC-P256 DIGITAL SIGNATURE</span>
                <span className="text-[#2563eb] text-[10px] break-all leading-tight">
                  {dossierData.hardwareAnchor.ecdsaSignature.slice(0, 48)}...
                </span>
              </div>
              <div className="bg-white p-2 rounded border border-[#e2e8f0]">
                <span className="text-[#64748b] text-[10px] block">TPM HARDWARE PCR[04] HASH</span>
                <span className="text-[#059669] text-[10px] break-all leading-tight">
                  {dossierData.hardwareAnchor.pcrHash}
                </span>
              </div>
            </div>

            <div className="bg-white p-2 rounded border border-[#e2e8f0] text-[11px] font-mono flex items-center justify-between">
              <div>
                <span className="text-[#64748b] text-[10px] block">MERKLE ROOT HASH (SHA-256)</span>
                <span className="text-[#0b1c30] text-[10px]">{dossierData.hardwareAnchor.merkleRoot}</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Metric Assessment Table */}
          <div>
            <h4 className="font-bold text-xs text-[#0b1c30] mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>Operational Metrics & Findings</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-[#eff4ff] rounded-lg border border-[#dce9ff]">
                <span className="text-[10px] text-[#64748b] block">Evaluated</span>
                <span className="font-bold text-sm text-[#0b1c30]">60 Frames</span>
              </div>
              <div className="p-2 bg-rose-50 rounded-lg border border-rose-200">
                <span className="text-[10px] text-rose-600 block">Quarantined</span>
                <span className="font-bold text-sm text-rose-700">5 Tainted</span>
              </div>
              <div className="p-2 bg-[#eff4ff] rounded-lg border border-[#dce9ff]">
                <span className="text-[10px] text-[#64748b] block">Compliance</span>
                <span className="font-bold text-sm text-[#2563eb]">100% (20/20)</span>
              </div>
              <div className="p-2 bg-[#eff4ff] rounded-lg border border-[#dce9ff]">
                <span className="text-[10px] text-[#64748b] block">Air-Gap Latency</span>
                <span className="font-bold text-sm text-[#059669]">0.82 ms</span>
              </div>
            </div>
          </div>

          {/* Quarantined Assets Table */}
          <div>
            <h4 className="font-bold text-xs text-[#0b1c30] mb-2">
              Quarantined Contributor B Ingest Artifacts
            </h4>
            <div className="overflow-x-auto border border-[#e2e8f0] rounded-lg">
              <table className="w-full text-[10px] font-mono text-left">
                <thead className="bg-[#f8f9ff] text-[#45464d] border-b border-[#e2e8f0]">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Asset Identifier</th>
                    <th className="p-2">Attack Vector</th>
                    <th className="p-2 text-right">P-Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {dossierData.quarantineLog.map((log) => (
                    <tr key={log.id} className="hover:bg-rose-50/50">
                      <td className="p-2 font-bold text-rose-600">{log.id}</td>
                      <td className="p-2 text-[#0b1c30]">{log.asset}</td>
                      <td className="p-2 text-[#45464d]">{log.vector}</td>
                      <td className="p-2 text-right font-bold text-rose-700">{log.pValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal statement */}
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-900 leading-normal">
            <span className="font-bold">EVIDENTIARY VALUE NOTICE:</span> This electronic manifest satisfies Sections 65B of the Indian Evidence Act for digital tamper resistance, anchored by unalterable cryptographic hash chains.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-[#f8f9ff] px-5 py-3 border-t border-[#e2e8f0] flex items-center justify-between">
          <span className="text-[10px] text-[#64748b] font-mono">
            Generated via AegisLens Sovereign Air-Gap Core
          </span>
          <button
            onClick={onClose}
            className="bg-[#0b1c30] hover:bg-[#1e293b] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
