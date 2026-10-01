import React from 'react';
import { ShieldCheck, Play, User, Terminal } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickDemo: () => void;
  onOpenOperatorModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickDemo,
  onOpenOperatorModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-md border-b border-[#e2e8f0]">
      {/* Top Brand Bar */}
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0b1c30] flex items-center justify-center shadow-sm group-hover:bg-[#131b2e] transition-colors">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-[#0f3972]">
              AegisLens
            </span>
            <span className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
              SIH 2024
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuickDemo}
            className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Quick Demo</span>
          </button>

          <button
            onClick={onOpenOperatorModal}
            title="Defense Operator Session"
            className="w-8 h-8 rounded-full bg-[#0b1c30] hover:bg-[#1e293b] flex items-center justify-center text-white text-xs transition-colors"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Segmented Tabs Bar */}
      <div className="max-w-2xl mx-auto px-4 pb-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs font-medium">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'demo', label: 'Demo' },
          { id: 'architecture', label: 'Architecture' },
          { id: 'threats', label: 'Threats' },
          { id: 'matrix', label: 'Defense' },
        ].map((item) => {
          const isActive = activeTab === item.id || (item.id === 'threats' && activeTab === 'threats');
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-[#2563eb] font-semibold shadow-xs border border-[#cbd5e1]'
                  : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff]/50'
              }`}
            >
              {item.label}
            </button>
          );
        })}

        <div className="ml-auto hidden sm:flex items-center gap-1 text-[11px] text-[#45464d] font-mono bg-[#eff4ff] px-2 py-0.5 rounded-md border border-[#dce9ff]">
          <Terminal className="w-3 h-3 text-[#2563eb]" />
          <span>VEGA-04</span>
        </div>
      </div>
    </header>
  );
};
