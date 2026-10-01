import { TacticalBenchmark, TensorFrame, MatrixItem, EvidenceObject } from '../types';

export const TACTICAL_BENCHMARKS: TacticalBenchmark[] = [
  {
    id: 'border-surveillance',
    name: 'Border Surveillance',
    description: '60 high-resolution aerial and thermal crops',
    frameCount: 60,
    taintedCount: 5,
    resolution: '1920x1080 FLIR MWIR',
    node: 'Edge Forward Post #04'
  },
  {
    id: 'aerial-drone-detection',
    name: 'Aerial Drone Detection',
    description: '80 multi-spectral micro-UAV telemetry frames',
    frameCount: 80,
    taintedCount: 7,
    resolution: '4K Electro-Optical Gimbal',
    node: 'Radar Interlock Pod #09'
  },
  {
    id: 'smart-city-traffic',
    name: 'Smart City Traffic',
    description: '50 municipal perimeter intersection sensors',
    frameCount: 50,
    taintedCount: 4,
    resolution: '1080p RTSP Stream H.265',
    node: 'Command Hub Gateway #02'
  }
];

// Generate 60 tensor frames (6 rows x 10 cols)
// Tainted frames indices match the heatmap in screenshot 2:
// Indices around: 22, 26, 31, 33, 42, 47
const TAINTED_INDICES = [22, 26, 31, 33, 47];

export const MOCK_TENSOR_FRAMES: TensorFrame[] = Array.from({ length: 60 }, (_, i) => {
  const isContribA = i < 30;
  const isTainted = TAINTED_INDICES.includes(i);
  const numId = i + 1;
  const hexHash = `0x${(1048576 + i * 3791).toString(16).padStart(8, '0')}`;

  return {
    id: numId,
    contributor: isContribA ? 'Contributor A (Gov SatOps)' : 'Contributor B (Vendor Edge Ingest)',
    contributorCode: isContribA ? 'C-A' : 'C-B',
    type: isContribA ? 'Thermal IR' : 'EO Sensor',
    isTainted,
    taintType: isTainted ? (i === 33 ? 'Trigger Stamped' : i === 22 ? 'Label Flipped' : 'Clean-Label Poison') : undefined,
    confidence: isTainted ? 0.34 : 0.98,
    hash: hexHash,
    status: isTainted ? 'untrusted' : 'verified',
    imageCategory: isContribA ? 'military_base' : (i === 33 ? 'road_trigger' : 'patrol_vehicle')
  };
});

export const MOCK_EVIDENCE_OBJECT: EvidenceObject = {
  evidenceId: 'ev-2024-0914-884b',
  severity: 'CRITICAL',
  category: 'BACKDOOR_TRIGGER',
  status: 'QUARANTINE',
  confidenceScore: 87.4,
  threshold: 75.0,
  pValue: 0.0003,
  diagnosis: 'High-frequency spectral anomaly and 14×14 pixel checkerboard trigger identified in top-right quadrant across 12 samples.',
  assetId: 'dataset/coco_train_v2/img_042.jpg',
  contributorId: 'vendor_b_payload',
  detectorImplementation: 'BackdoorDetector v1.4.2 (Spectral + Spatial Patch)',
  limitations: [
    'Only covers static triggers (affine transforms unverified)',
    'Clean-label poisoning excluded from current search radius'
  ],
  triggerDimensions: {
    x: 240,
    y: 240,
    w: 14,
    h: 14
  },
  pcrAttestation: '7b1c4e92aa84f180c449102c77d61b6910a3014c9c1b',
  timestamp: '2024-09-14T11:42:09.124Z'
};

export const MASTER_DEFICIENCIES: MatrixItem[] = [
  {
    id: 'airgap',
    number: '01',
    title: 'Air-Gapped Operation',
    tcviaf: 'AegisLens: 100% Offline',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: Offline CLI',
    academicBadge: 'Acad',
    commercial: 'Comm: Cloud Only',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'amber',
    commercialStatus: 'red',
    details: {
      problem: 'Defense tactical nodes and forward combat posts operate under strict physical and RF Faraday isolation with zero external internet access.',
      academicShortcoming: 'Academic scripts require extensive Python environments and manual CLI invocation without hardened hardware attestation.',
      commercialRisk: 'Commercial US/EU tools (Robust Intelligence, Arthur AI, Fiddler) require telemetry egress to foreign cloud servers, violating DCA-2023.',
      tcviafSolution: '100% self-contained binary running on local NVMe/TPM silicon with zero cloud telemetry egress.',
      standards: 'DRDO CAIR & Defence Cyber Agency DCA-2023 Compliant'
    }
  },
  {
    id: 'backdoor',
    number: '02',
    title: 'Multi-Layer Backdoor Audit',
    tcviaf: 'AegisLens: Full Stack',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: Partial',
    academicBadge: 'Acad',
    commercial: 'Comm: Partial Drift',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'amber',
    commercialStatus: 'red',
    details: {
      problem: 'Stealth physical patch triggers (e.g. 14x14 checkerboard stickers on target vehicles) cause neural classifiers to misclassify hostiles as friendly.',
      academicShortcoming: 'Neural Cleanse and STRIP only test inverted triggers on toy classification architectures, failing on YOLO anchor boxes.',
      commercialRisk: 'Only monitors statistical drift metrics; completely blind to latent Trojan triggers in model weights.',
      tcviafSolution: 'Joint spatial, 2D Fourier spectral decomposition, and activation gradient layer scanning.',
      standards: 'Spectral Residual Perturbation ISO/IEC DIS 24029'
    }
  },
  {
    id: 'crypto-chain',
    number: '03',
    title: 'Crypto Hash Inference Chain',
    tcviaf: 'AegisLens: SHA-256 Chain',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: None',
    academicBadge: 'Acad',
    commercial: 'Comm: Plain DB',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'red',
    commercialStatus: 'red',
    details: {
      problem: 'Post-incident defense courts of inquiry require immutable judicial proof of whether model weights or inputs were tampered with.',
      academicShortcoming: 'Academic toolchains write plain text log files easily edited or corrupted.',
      commercialRisk: 'Stores inference logs in standard cloud SQL databases vulnerable to administrative tampering.',
      tcviafSolution: 'Merkle hash tree anchoring of every video frame, model checkpoint, and resulting bounding box.',
      standards: 'NIST FIPS 180-4 SHA-256 Merkle Provenance'
    }
  },
  {
    id: 'contributor-attr',
    number: '04',
    title: 'Contributor Attribution',
    tcviaf: 'AegisLens: Auto-Quarantine',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: No Identity',
    academicBadge: 'Acad',
    commercial: 'Comm: Metric Only',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'red',
    commercialStatus: 'red',
    details: {
      problem: 'Multi-vendor defense procurement (Vendor A data, Vendor B model, Vendor C edge integrator) causes finger-pointing when flaws emerge.',
      academicShortcoming: 'Treats all data as homogeneous; cannot isolate or trace tainted tensors back to vendor identity.',
      commercialRisk: 'Calculates global drift percentages without contributor-level cryptographic identity or selective quarantine.',
      tcviafSolution: 'Dynamic Bayesian reputation tracking with micro-quarantine of tainted sub-batches without dropping clean data.',
      standards: 'Bayesian Culpability Scoring RFC-9442'
    }
  },
  {
    id: 'coco-yolo',
    number: '05',
    title: 'COCO & YOLO Native Support',
    tcviaf: 'AegisLens: Native CV',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: ImageNet Only',
    academicBadge: 'Acad',
    commercial: 'Comm: Tabular/NLP',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'amber',
    commercialStatus: 'red',
    details: {
      problem: 'Military vision systems use YOLOv8/11 and MS-COCO bounding box coordinate systems, not single-label ImageNet classifications.',
      academicShortcoming: '90% of academic papers evaluate only CIFAR-10 or single-label ImageNet images.',
      commercialRisk: 'Primarily designed for tabular data, fraud detection, and NLP LLM drift; object detection support is an afterthought.',
      tcviafSolution: 'Native geometric tensor parser for XYWH normalized boxes, polygons, and multi-spectral FLIR streams.',
      standards: 'MS-COCO & YOLO Native Tensor Parsing'
    }
  },
  {
    id: 'zero-retrain',
    number: '06',
    title: 'Zero Retraining Overhead',
    tcviaf: 'AegisLens: Post-Hoc Audit',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: Heavy Epochs',
    academicBadge: 'Acad',
    commercial: 'Comm: Proxy Intercept',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'red',
    commercialStatus: 'amber',
    details: {
      problem: 'Defense models cannot be retrained during deployed operations due to limited compute on FPGA/edge silicon.',
      academicShortcoming: 'Methods like fine-pruning require dozens of retraining epochs and GPU clusters.',
      commercialRisk: 'Adds heavy inference proxy latency (150ms+), which violates millisecond radar and optical tracking limits.',
      tcviafSolution: 'Post-hoc audit with sub-millisecond (0.8ms) pass-through verification using latent vector checks.',
      standards: 'Real-time Edge Latency SLA (< 1.0ms)'
    }
  },
  {
    id: 'evidence-json',
    number: '07',
    title: 'Evidence JSON Schema',
    tcviaf: 'AegisLens: C-DAC Ready',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: Raw TXT/Log',
    academicBadge: 'Acad',
    commercial: 'Comm: Proprietary',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'red',
    commercialStatus: 'amber',
    details: {
      problem: 'Interoperability between Tri-Services (Army, Navy, Air Force) requires a uniform machine-readable forensic format.',
      academicShortcoming: 'Produces ad-hoc CSV or text logs incompatible with military C4I command systems.',
      commercialRisk: 'Locked inside proprietary vendor SaaS dashboards with no raw interoperable schema.',
      tcviafSolution: 'Standardized JSON-LD schema conforming to RFC-9442 and C-DAC Param Rudra interoperability guidelines.',
      standards: 'Canonical JSON-LD RFC-9442'
    }
  },
  {
    id: 'ec-p256',
    number: '08',
    title: 'EC-P256 Audit Signature',
    tcviaf: 'AegisLens: Hardware P-256',
    tcviafBadge: 'AegisLens',
    academic: 'Acad: None',
    academicBadge: 'Acad',
    commercial: 'Comm: None',
    commercialBadge: 'Comm',
    tcviafStatus: 'green',
    academicStatus: 'red',
    commercialStatus: 'red',
    details: {
      problem: 'Audit reports must hold legal evidentiary value under the Indian Evidence Act and military court martials.',
      academicShortcoming: 'No cryptographic anchoring or signing mechanism.',
      commercialRisk: 'Relies on standard TLS and web sessions with zero asymmetric key signing of audit manifests.',
      tcviafSolution: 'ECDSA NIST P-256 hardware enclave signature generated by on-die TPM / HSM crypto coprocessor.',
      standards: 'NIST SP 800-186 & Indian Evidence Act Digital Admissibility'
    }
  }
];

export const GROUNDBREAKING_CONTRIBUTIONS = [
  {
    number: '01',
    category: 'PROTOCOL',
    title: 'Unified Evidence Schema',
    description: 'The first deterministic taxonomy binding heterogeneous vision flaws (out-of-distribution, near-duplicate poisoning, and label drift) into a JSON-LD verifiable credential graph.',
    badges: ['Canonical JSON-LD', 'RFC Compliant']
  },
  {
    number: '02',
    category: 'CRYPTOGRAPHY',
    title: 'Cryptographic Inference Binding',
    description: 'Eliminates man-in-the-middle inference forgery by sealing output logits, runtime weight checkpoints, and hardware enclave attestation via Ed25519 signatures.',
    badges: ['Zero Model Swapping', 'Hardware Anchored']
  },
  {
    number: '03',
    category: 'DEFENSE-IN-DEPTH',
    title: 'Multi-Layer Backdoor Detection',
    description: 'Joint spatial, frequency, and activation-space verification. Captures imperceptible high-frequency triggers overlooked by standard spatial convolution filters.',
    badges: ['Fourier Inversion', 'Patch Heuristics']
  },
  {
    number: '04',
    category: 'ATTRIBUTION',
    title: 'Contributor Risk Aggregator',
    description: 'Dynamic Bayesian reputation tracking that attributes tainted samples to specific vendor pipelines, allowing micro-quarantine of contaminated sub-batches without discarding valid data.',
    badges: ['Bayesian Culpability', 'Selective Pruning']
  },
  {
    number: '05',
    category: 'ADAPTABILITY',
    title: 'Zero-Assumption Tiering',
    description: 'Graceful performance degradation across Black-box (APIs), Grey-box (weights only), and White-box (full gradients), ensuring sovereign security even with proprietary vendor models.',
    badges: ['Tri-Tier Spectrum', 'Zero Lock-in']
  }
];

export const OPERATIONAL_PILLARS = [
  {
    id: 1,
    title: '1. Training Data Integrity',
    summary: 'Merkle hash anchoring, near-duplicate detection, and label corruption validation.',
    points: [
      'SHA-256 Merkle tree calculation across all visual assets and annotation bboxes.',
      'Perceptual hashing (pHash) and SimHash indexing for clone & poison discovery.',
      'Cleanlab confident learning engine to flag adversarial label flipping (e.g. civilian ⇄ hostile).'
    ]
  },
  {
    id: 2,
    title: '2. Model Integrity',
    summary: 'Weight fingerprinting, backdoor latent perturbation scanning, and clean-label detection.',
    points: [
      'Tensor weight hash trees to ensure pre-trained ResNet/YOLO weights match verified manifests.',
      'Spatial Fourier transform inversion to isolate trigger patterns down to 8x8 pixels.',
      'Activation clustering in penultimate layers to isolate poisoned latent clusters.'
    ]
  },
  {
    id: 3,
    title: '3. Inference Provenance',
    summary: 'Real-time cryptographic binding linking camera frame hashes, model IDs, and prediction boxes.',
    points: [
      'Hardware TPM / Enclave attestation with PCR-04 validation per inference frame.',
      'Asymmetric ECDSA P-256 digital signature embedded into forensic log stream.',
      'Immutable tamper-evident chain preventing silent substitution of model weights.'
    ]
  },
  {
    id: 4,
    title: '4. Distribution Shift',
    summary: 'Statistical divergence tracking across weather, terrain, and adversarial jamming.',
    points: [
      'Kolmogorov-Smirnov (KS) two-sample test for non-parametric distribution divergence.',
      'Wasserstein / Earth Mover distance metric for thermal sensor degradation.',
      'Real-time anomaly alarm when sensor drift crosses sovereign safety thresholds.'
    ]
  },
  {
    id: 5,
    title: '5. Analyst Assurance & Dispositions',
    summary: 'Automated RFC-9442 JSON attestation certificates and one-click sandbox quarantine.',
    points: [
      'Exportable court-admissible forensic certificates for procurement and defense trials.',
      'Selective quarantine isolating vendor-specific tainted shards without stopping operations.',
      'Live forensic playback with interactive spatial and frequency trigger visualizations.'
    ]
  }
];
