import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewView } from './views/OverviewView';
import { LiveDemoView } from './views/LiveDemoView';
import { ArchitectureView } from './views/ArchitectureView';
import { MatrixView } from './views/MatrixView';
import { QuickDemoModal } from './components/QuickDemoModal';
import { DossierModal } from './components/DossierModal';
import { OperatorModal } from './components/OperatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [showQuickDemo, setShowQuickDemo] = useState<boolean>(false);
  const [showDossier, setShowDossier] = useState<boolean>(false);
  const [showOperatorModal, setShowOperatorModal] = useState<boolean>(false);

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Sticky Header with SIH 2024 branding and quick actions */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenQuickDemo={() => setShowQuickDemo(true)}
        onOpenOperatorModal={() => setShowOperatorModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'overview' && (
          <OverviewView
            onNavigate={handleNavigate}
            onOpenQuickDemo={() => setShowQuickDemo(true)}
            onOpenDossier={() => setShowDossier(true)}
          />
        )}

        {activeTab === 'demo' && (
          <LiveDemoView
            onOpenDossier={() => setShowDossier(true)}
            onNavigateToArch={() => handleNavigate('architecture')}
          />
        )}

        {(activeTab === 'architecture' || activeTab === 'threats') && (
          <ArchitectureView
            onOpenDossier={() => setShowDossier(true)}
          />
        )}

        {activeTab === 'matrix' && (
          <MatrixView
            onOpenDossier={() => setShowDossier(true)}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={handleNavigate} />

      {/* Modals & Dialogs */}
      <QuickDemoModal
        isOpen={showQuickDemo}
        onClose={() => setShowQuickDemo(false)}
        onNavigate={handleNavigate}
      />

      <DossierModal
        isOpen={showDossier}
        onClose={() => setShowDossier(false)}
      />

      <OperatorModal
        isOpen={showOperatorModal}
        onClose={() => setShowOperatorModal(false)}
      />
    </div>
  );
}
