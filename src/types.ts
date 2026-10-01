export type ActiveTab = 'overview' | 'demo' | 'architecture' | 'threats' | 'matrix';

export interface TensorFrame {
  id: number;
  contributor: 'Contributor A (Gov SatOps)' | 'Contributor B (Vendor Edge Ingest)';
  contributorCode: 'C-A' | 'C-B';
  type: string;
  isTainted: boolean;
  taintType?: 'Trigger Stamped' | 'Label Flipped' | 'Adversarial Jitter' | 'Clean-Label Poison';
  confidence: number;
  hash: string;
  status: 'verified' | 'untrusted' | 'quarantined';
  imageCategory: 'military_base' | 'road_trigger' | 'drone_sky' | 'patrol_vehicle';
}

export interface TacticalBenchmark {
  id: string;
  name: string;
  description: string;
  frameCount: number;
  taintedCount: number;
  resolution: string;
  node: string;
}

export interface MatrixItem {
  id: string;
  number: string;
  title: string;
  tcviaf: string;
  tcviafBadge: string;
  academic: string;
  academicBadge: string;
  commercial: string;
  commercialBadge: string;
  tcviafStatus: 'green' | 'blue';
  academicStatus: 'amber' | 'red';
  commercialStatus: 'red' | 'amber';
  details: {
    problem: string;
    academicShortcoming: string;
    commercialRisk: string;
    tcviafSolution: string;
    standards: string;
  };
}

export interface EvidenceObject {
  evidenceId: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  category: string;
  status: 'QUARANTINE' | 'FLAGGED' | 'RESOLVED';
  confidenceScore: number;
  threshold: number;
  pValue: number;
  diagnosis: string;
  assetId: string;
  contributorId: string;
  detectorImplementation: string;
  limitations: string[];
  triggerDimensions: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  pcrAttestation: string;
  timestamp: string;
}
