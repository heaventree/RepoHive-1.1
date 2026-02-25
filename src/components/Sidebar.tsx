import React from 'react';
import { 
  Database, 
  Rocket, 
  Activity, 
  Settings, 
  ChevronsUpDown, 
  Building2,
  PlusCircle,
  HelpCircle,
  Bell,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'library', label: 'Library', icon: Database, group: 'Core Intelligence' },
    { id: 'projects', label: 'Projects', icon: Rocket, group: 'Core Intelligence' },
    { id: 'monitoring', label: 'Monitoring', icon: Activity, group: 'Core Intelligence' },
    { id: 'policies', label: 'Policies', icon: ShieldCheck, group: 'Configuration' },
    { id: 'config', label: 'System Config', icon: Settings, group: 'Configuration' },
  ];

  return (
    <aside className="w-64 bg-bg-dark border-r border-border-main flex flex-col flex-none z-20">
      <div className="p-3">
        <div className="mb-4">
          <div className="px-3 py-2 bg-bg-panel border border-border-main rounded-sm flex items-center justify-between cursor-pointer hover:border-slate-500 transition-colors group">
            <div className="flex items-center gap-2 overflow-hidden">
              <Building2 className="text-accent-blue w-4 h-4" />
              <span className="text-xs font-bold truncate">Internal Platform</span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </div>
        </div>

        <div className="space-y-6">
          {['Core Intelligence', 'Configuration'].map(group => (
            <div key={group}>
              <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono opacity-70">
                {group}
              </div>
              <nav className="space-y-0.5">
                {navItems.filter(item => item.group === group).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'bg-slate-800/50 border border-border-main border-l-[3px] border-l-accent-blue text-white' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-bg-panel'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-accent-blue' : ''}`} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-3 border-t border-border-main bg-bg-panel/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase text-slate-500 font-mono">System Status</span>
          <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
        </div>
        <div className="w-full bg-bg-dark h-1 rounded-full overflow-hidden mb-1">
          <div className="bg-accent-green h-full w-[98%]"></div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>API: Online</span>
          <span>98ms</span>
        </div>
      </div>
    </aside>
  );
};
