import React, { useState } from 'react';

interface DimensionDetail {
  name: string;
  tcviaf: number; // 0 - 100
  commercial: number;
  academic: number;
  description: string;
}

const DIMENSIONS: DimensionDetail[] = [
  {
    name: 'DATA INTEGRITY',
    tcviaf: 100,
    commercial: 60,
    academic: 50,
    description: 'Merkle-tree hash proof & cleanlab noise filtration across MS-COCO/YOLO labels.'
  },
  {
    name: 'MODEL INTEGRITY',
    tcviaf: 100,
    commercial: 40,
    academic: 65,
    description: 'Spectral Fourier transform backdoor detection & latent space activation clustering.'
  },
  {
    name: 'PROVENANCE',
    tcviaf: 100,
    commercial: 45,
    academic: 20,
    description: 'Hardware TPM sealed PCR-04 digital signatures linking frame to inference bbox.'
  },
  {
    name: 'AIR-GAP',
    tcviaf: 100,
    commercial: 0,
    academic: 70,
    description: 'Strict 100% zero-egress offline runtime complying with Defence Cyber Agency DCA-2023.'
  },
  {
    name: 'INFERENCE',
    tcviaf: 95,
    commercial: 75,
    academic: 35,
    description: 'Sub-millisecond latency (<0.8ms) pass-through with Kolmogorov-Smirnov drift alarms.'
  }
];

export const RadarChart: React.FC = () => {
  const [hoveredDim, setHoveredDim] = useState<number | null>(null);

  const size = 300;
  const center = size / 2;
  const radius = 100;
  const numSides = 5;

  // Calculate polygon points given an array of ratio values (0..1)
  const getCoordinates = (values: number[]) => {
    return values.map((val, i) => {
      // Start at top (-PI/2)
      const angle = (Math.PI * 2 * i) / numSides - Math.PI / 2;
      const r = (val / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, angle };
    });
  };

  const getPointsString = (coords: { x: number; y: number }[]) => {
    return coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  };

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const tcviafCoords = getCoordinates(DIMENSIONS.map((d) => d.tcviaf));
  const commercialCoords = getCoordinates(DIMENSIONS.map((d) => d.commercial));
  const academicCoords = getCoordinates(DIMENSIONS.map((d) => d.academic));

  // Outer label positions slightly outside the radius
  const labelPositions = DIMENSIONS.map((d, i) => {
    const angle = (Math.PI * 2 * i) / numSides - Math.PI / 2;
    const r = radius + 24;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, name: d.name, angle };
  });

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#2563eb]">
            <span className="text-xs font-bold font-mono">⬠</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0b1c30]">Capability Pentagon</h4>
            <span className="text-[10px] text-[#64748b]">5 Defense Dimensions</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
            <span className="font-semibold text-[#0b1c30]">AegisLens (100%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
            <span className="text-[#64748b]">US/EU Commercial</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#94a3b8]"></span>
            <span className="text-[#64748b]">Academic</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative flex justify-center py-2">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background grid concentric pentagons */}
          {gridLevels.map((lvl, idx) => {
            const gridCoords = getCoordinates([lvl * 100, lvl * 100, lvl * 100, lvl * 100, lvl * 100]);
            return (
              <polygon
                key={idx}
                points={getPointsString(gridCoords)}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={idx === gridLevels.length - 1 ? '1.5' : '1'}
                strokeDasharray={idx === gridLevels.length - 1 ? undefined : '3,3'}
              />
            );
          })}

          {/* Radial axis lines from center to outer vertices */}
          {tcviafCoords.map((coord, i) => {
            const angle = (Math.PI * 2 * i) / numSides - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Academic Polygon (Gray) */}
          <polygon
            points={getPointsString(academicCoords)}
            fill="#94a3b8"
            fillOpacity="0.08"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          {academicCoords.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="2.5" fill="#94a3b8" />
          ))}

          {/* US/EU Commercial Polygon (Red) */}
          <polygon
            points={getPointsString(commercialCoords)}
            fill="#ef4444"
            fillOpacity="0.08"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4,2"
          />
          {commercialCoords.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="2.5" fill="#ef4444" />
          ))}

          {/* TCVIAF Sovereign Polygon (Blue) */}
          <polygon
            points={getPointsString(tcviafCoords)}
            fill="#3b82f6"
            fillOpacity="0.22"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
          {tcviafCoords.map((c, i) => (
            <circle
              key={i}
              cx={c.x}
              cy={c.y}
              r={hoveredDim === i ? '5' : '3.5'}
              fill="#2563eb"
              stroke="#ffffff"
              strokeWidth="1.5"
              className="cursor-pointer transition-all"
              onMouseEnter={() => setHoveredDim(i)}
              onMouseLeave={() => setHoveredDim(null)}
            />
          ))}

          {/* Outer Dimension Labels */}
          {labelPositions.map((pos, i) => {
            const isHovered = hoveredDim === i;
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (pos.x < center - 10) textAnchor = 'end';
            if (pos.x > center + 10) textAnchor = 'start';

            return (
              <text
                key={i}
                x={pos.x}
                y={pos.y + 4}
                textAnchor={textAnchor}
                className={`text-[9px] font-bold cursor-pointer transition-colors ${
                  isHovered ? 'fill-[#2563eb] font-extrabold' : 'fill-[#45464d]'
                }`}
                onMouseEnter={() => setHoveredDim(i)}
                onMouseLeave={() => setHoveredDim(null)}
              >
                {pos.name}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip Card */}
      <div className="mt-2 min-h-[46px] p-2 bg-[#f8f9ff] rounded-xl border border-[#dce9ff] text-xs">
        {hoveredDim !== null ? (
          <div>
            <div className="flex items-center justify-between font-semibold text-[#0b1c30]">
              <span className="text-[#2563eb] font-bold">{DIMENSIONS[hoveredDim].name}</span>
              <div className="flex gap-2 text-[10px] font-mono">
                <span className="text-[#2563eb]">AegisLens: {DIMENSIONS[hoveredDim].tcviaf}%</span>
                <span className="text-[#ef4444]">Comm: {DIMENSIONS[hoveredDim].commercial}%</span>
                <span className="text-[#64748b]">Acad: {DIMENSIONS[hoveredDim].academic}%</span>
              </div>
            </div>
            <p className="text-[11px] text-[#45464d] mt-0.5">
              {DIMENSIONS[hoveredDim].description}
            </p>
          </div>
        ) : (
          <p className="text-[11px] text-[#64748b] text-center italic">
            Tap or hover over any dimension vertex to inspect sovereign audit metrics
          </p>
        )}
      </div>
    </div>
  );
};
