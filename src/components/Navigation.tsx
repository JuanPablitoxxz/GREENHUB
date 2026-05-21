interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLaunchClick: () => void;
  userCredits: number;
}

export default function Navigation({ currentTab, onTabChange, onLaunchClick, userCredits }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Panel' },
    { id: 'impact', label: 'Impacto' },
    { id: 'community', label: 'Comunidad' },
    { id: 'rewards', label: 'Recompensas' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-3 bg-slate-900/65 backdrop-blur-xl rounded-full mt-4 md:mt-6 mx-auto max-w-5xl border border-white/10 shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all duration-300">
      
      {/* Brand Logo */}
      <button 
        onClick={() => onTabChange('dashboard')} 
        className="text-2xl font-display font-extrabold tracking-tighter text-emerald-500 hover:opacity-80 transition-opacity cursor-pointer select-none bg-transparent border-none outline-none"
      >
        GreenHub
      </button>

      {/* Tabs list (desktop) */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-1 font-sans text-sm font-semibold transition-colors duration-300 select-none cursor-pointer ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-300 hover:text-emerald-400'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-[-6px] left-0 right-0 h-[2.5px] bg-emerald-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action triggers / details */}
      <div className="flex items-center gap-3">
        {/* Credits pocket (mobile helper pill) */}
        <button
          onClick={() => onTabChange('rewards')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          <span>{userCredits.toLocaleString()} COP</span>
        </button>

        <button 
          onClick={onLaunchClick}
          className="bg-emerald-500 text-slate-950 font-bold text-xs md:text-sm px-4 md:px-6 py-2 rounded-full hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 select-none cursor-pointer"
        >
          Iniciar GreenHub
        </button>
      </div>
    </nav>
  );
}
