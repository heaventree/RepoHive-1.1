import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Library } from './components/Library';
import { Ingest } from './components/Ingest';
import { RepoDetail } from './components/RepoDetail';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { ConfigPortal } from './components/ConfigPortal';
import { Monitoring } from './components/Monitoring';
import { Policies } from './components/Policies';
import { Repo } from './types';
import { Bell, HelpCircle, Search, Plus, Rocket, Database, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const handleTabChange = (tab: string) => {
    setSelectedRepo(null);
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (selectedRepo) {
      return <RepoDetail repo={selectedRepo} onBack={() => setSelectedRepo(null)} />;
    }

    switch (activeTab) {
      case 'library':
        return <Library 
          onViewRepo={setSelectedRepo} 
          onBulkIngest={() => setActiveTab('ingest')} 
          onGoToWorkspace={() => setActiveTab('projects')}
        />;
      case 'ingest':
        return <Ingest onComplete={() => setActiveTab('library')} />;
      case 'projects':
        return <ProjectWorkspace setActiveTab={setActiveTab} />;
      case 'monitoring':
        return <Monitoring />;
      case 'policies':
        return <Policies />;
      case 'config':
        return <ConfigPortal onBack={() => setActiveTab('library')} />;
      default:
        return <Library 
          onViewRepo={setSelectedRepo} 
          onBulkIngest={() => setActiveTab('ingest')} 
          onGoToWorkspace={() => setActiveTab('projects')}
        />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark">
      {/* Header */}
      <header className="h-14 flex-none bg-bg-panel border-b border-border-main flex items-center justify-between px-4 z-30 shadow-sm">
        <div className="flex items-center gap-4 w-72">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white text-bg-dark flex items-center justify-center font-bold text-sm rounded-sm font-mono">RS</div>
            <h1 className="font-bold text-sm tracking-tight text-white">RepoScout</h1>
          </div>
          <div className="h-4 w-px bg-border-main mx-1"></div>
          <div className="text-xs font-mono text-slate-500">v2.1.0</div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="flex items-center gap-8">
            <nav className="flex gap-6 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <button 
                onClick={() => handleTabChange('library')}
                className={`flex items-center gap-1.5 transition-colors ${activeTab === 'library' ? 'text-accent-blue border-b border-accent-blue pb-0.5' : 'hover:text-white'}`}
              >
                <Database className="w-3 h-3" /> Library
              </button>
              <button 
                onClick={() => handleTabChange('projects')}
                className={`flex items-center gap-1.5 transition-colors ${activeTab === 'projects' ? 'text-accent-blue border-b border-accent-blue pb-0.5' : 'hover:text-white'}`}
              >
                <Rocket className="w-3 h-3" /> Projects
              </button>
              <button 
                onClick={() => handleTabChange('monitoring')}
                className={`flex items-center gap-1.5 transition-colors ${activeTab === 'monitoring' ? 'text-accent-blue border-b border-accent-blue pb-0.5' : 'hover:text-white'}`}
              >
                <Activity className="w-3 h-3" /> Monitoring
              </button>
            </nav>
            <div className="h-4 w-px bg-border-main mx-2"></div>
            <div className="w-64 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-accent-blue transition-colors" />
              <input 
                className="w-full bg-bg-dark border border-border-main text-xs py-1.5 pl-10 pr-4 rounded-sm focus:border-accent-blue focus:ring-1 focus:ring-accent-blue text-white placeholder-slate-500 transition-all font-mono shadow-inner outline-none" 
                placeholder="Search nodes..." 
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-72 justify-end">
          {activeTab === 'projects' && (
            <button 
              onClick={() => {
                // We need a way to trigger isCreating in ProjectWorkspace
                // For now, let's just use a custom event or pass a prop
                window.dispatchEvent(new CustomEvent('trigger-create-project'));
              }}
              className="flex items-center gap-2 bg-accent-blue hover:bg-blue-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-sm transition-all shadow-lg shadow-blue-500/10 uppercase tracking-wider mr-2"
            >
              <Plus className="w-3.5 h-3.5" />
              New Project
            </button>
          )}
          <button className="text-slate-500 hover:text-white transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-slate-500 hover:text-white transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <div className="h-4 w-px bg-border-main mx-1"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-sm border border-border-main flex items-center justify-center text-xs font-mono font-bold shadow-md">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <main className="flex-1 flex flex-col min-w-0 bg-bg-dark relative overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
