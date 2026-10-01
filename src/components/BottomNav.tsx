import React from 'react';
import { Shield, SlidersHorizontal, Layers, FileSearch, LayoutGrid } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'demo', label: 'Live Demo', icon: SlidersHorizontal },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'threats', label: 'Evidence', icon: FileSearch },
    { id: 'matrix', label: 'Matrix', icon: LayoutGrid },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] shadow-lg">
      <div className="max-w-2xl mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#2563eb]'
                  : 'text-[#64748b] hover:text-[#0b1c30]'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-[#eff4ff]' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-[#2563eb]' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
