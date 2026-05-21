import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, Lock, MapPin, Globe, Activity, ArrowRight, 
  Sparkles, BatteryCharging, Check, RefreshCw
} from 'lucide-react';
import { AppState, DepositRecord } from '../types';

interface ImpactViewProps {
  state: AppState;
}

export default function ImpactView({ state }: ImpactViewProps) {
  const [selectedNode, setSelectedNode] = useState<'principal' | 'tecnologico'>('principal');
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate dynamic ocean badges constraints. 
  // Let's assume the user starts needing to recycle plastic 3 times to unlock 'Guardián del Océano'
  // and we count how many plastic records exist.
  const plasticCount = state.history.filter(h => h.material === 'plastic').length;
  const isOceanBadgeUnlocked = plasticCount >= 5;
  const remainingPlasticDeposits = Math.max(0, 5 - plasticCount);

  // Coordinates offset on holographic city map corresponding to node select
  const nodeCoords = {
    principal: { x: '66%', y: '50%' }, // madrid coordinates as highlighted in thumbnail
    tecnologico: { x: '50%', y: '33%' }
  };

  return (
    <div className="w-full relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center md:text-left">
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold block mb-1">Telemetría</span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-4 text-white">
          Tu <span className="text-emerald-400 glow-text-emerald">Impacto</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-light">
          Visualiza el cambio que generas. Cada residuo procesado es un paso hacia un ecosistema más saludable.
        </p>
      </header>

      {/* Bento Grid: Analytics & Impact */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        
        {/* Main Data Card: CO2 Ahorrado */}
        <div className="md:col-span-8 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">Métrica Vital</span>
                <h2 className="text-2xl font-display font-bold mt-1 text-white">CO₂ Ahorrado</h2>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-7xl font-display font-black text-white tracking-tighter">
                {state.co2SavedKg.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              </span>
              <span className="text-2xl font-display font-bold text-emerald-400">kg</span>
            </div>

            {/* SVG Line Graph Wave */}
            <div className="mt-8 h-44 w-full relative">
              <svg className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] fill-none" viewBox="0 0 400 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="impact-wave-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgba(16, 185, 129, 0.45)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgba(16, 185, 129, 0)', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20" 
                  stroke="#10b981" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20 L400,100 L0,100 Z" 
                  fill="url(#impact-wave-grad)" 
                />
                <circle cx="400" cy="20" fill="#10b981" r="5" className="animate-pulse" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Background Decor */}
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none" />
        </div>

        {/* Side Card: Residuos Procesados (Radial) */}
        <div className="md:col-span-4 glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center group transition-all hover:border-cyan-500/20">
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold mb-6 block">Eficiencia Global</span>
          
          <div className="relative w-40 h-40 mb-6 cursor-pointer" onClick={() => setShowBreakdown(!showBreakdown)}>
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_12px_rgba(0,229,255,0.25)]" viewBox="0 0 36 36">
              <path 
                className="text-slate-800" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
              />
              <motion.path 
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${state.separationAccuracy}, 100` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-cyan-400" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeWidth="3" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-black text-white">{state.separationAccuracy}%</span>
              <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold">Precisión</span>
            </div>
          </div>

          <h3 className="text-xl font-display font-bold text-white mb-2">Residuos Procesados</h3>
          
          <p className="text-slate-400 text-xs leading-relaxed">
            {showBreakdown ? (
              <span className="text-cyan-300 font-mono text-[10px]">
                Plástico: 38% // Vidrio: 22% // Tecnológico: 40%
              </span>
            ) : (
              "Has superado el promedio de la comunidad por un 12% este mes."
            )}
          </p>

          <button 
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="mt-6 w-full py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-bold flex items-center justify-center gap-1.5 group cursor-pointer"
          >
            {showBreakdown ? 'Ocultar Desglose' : 'Ver Desglose'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Section: Holographic Map */}
        <div className="md:col-span-12 glass-panel rounded-3xl p-0 overflow-hidden relative min-h-[500px] group border border-white/5 shadow-2xl">
          {/* Node metadata explorer panel */}
          <div className="absolute top-6 left-6 z-10 max-w-sm glass-panel p-6 rounded-2xl border border-emerald-500/20 shadow-2xl bg-slate-950/80 backdrop-blur-md">
            <h2 className="text-xl font-display font-black text-white mb-1">Centros Cercanos</h2>
            <p className="text-slate-400 text-xs mb-6">Mapa holográfico de nodos de recolección y regeneración local.</p>
            
            <div className="space-y-3">
              {/* Node 1 */}
              <button 
                onClick={() => setSelectedNode('principal')}
                className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  selectedNode === 'principal'
                    ? 'bg-emerald-500/15 border-emerald-500/35 shadow-lg'
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedNode === 'principal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Eco-Nodo Principal</p>
                  <p className="text-xs text-slate-500">Madrid Centro • A 0.4 km de distancia</p>
                </div>
                {selectedNode === 'principal' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
              </button>

              {/* Node 2 */}
              <button 
                onClick={() => setSelectedNode('tecnologico')}
                className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  selectedNode === 'tecnologico'
                    ? 'bg-cyan-500/15 border-cyan-500/35 shadow-lg'
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedNode === 'tecnologico' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                  <BatteryCharging className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Reciclaje Tecnológico</p>
                  <p className="text-xs text-slate-500">Distrito Norte • A 1.2 km de distancia</p>
                </div>
                {selectedNode === 'tecnologico' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
              </button>
            </div>
          </div>

          {/* Simulated Map Container with markers */}
          <div className="w-full h-[520px] relative overflow-hidden bg-slate-950">
            <img 
              className="w-full h-full object-cover grayscale brightness-40 contrast-125 select-none pointer-events-none" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuPChhMer3NgXbJZ7e9qgv8DPU3vExVFRBfrVVH8h33fh8mTdtfry9aN475ozxWPVWTKC-OwfDyvXDsCIbgYi9kUubYsrkD3QhLhZpAn2P4c638viHMWV7JGAFw-o4qlVUB9t4Lt0-mutBPRv-_SdgYB8GwGZsAQJqndKoNQ4TFE41VKLTtZ6FKJpiZFnMvxWh35wCgB329CNUSbtqauG2kJx9vCbozIJ0Zxc2AbeEnJT8W1363Wc13nCeM7EY0nmZInPw5yIv4G4"
              alt="Madrid 3D city holographic map"
            />
            
            {/* Pulsing pings overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Eco-Nodo Principal coordinate */}
              <div 
                className="absolute transition-all duration-700 ease-out" 
                style={{ left: nodeCoords.principal.x, top: nodeCoords.principal.y }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute flex h-5 w-5 rounded-full bg-emerald-400/30 animate-ping" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
                  {selectedNode === 'principal' && (
                    <div className="absolute top-4 left-4 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 whitespace-nowrap border border-emerald-500/20">
                      NODO_PR_04 // ACTIVE
                    </div>
                  )}
                </div>
              </div>

              {/* Reciclaje Tecnológico coordinate */}
              <div 
                className="absolute transition-all duration-700 ease-out" 
                style={{ left: nodeCoords.tecnologico.x, top: nodeCoords.tecnologico.y }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute flex h-5 w-5 rounded-full bg-cyan-400/30 animate-ping" />
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00e5ff]" />
                  {selectedNode === 'tecnologico' && (
                    <div className="absolute top-4 left-4 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-cyan-400 whitespace-nowrap border border-cyan-500/20">
                      NODO_EW_12 // ONLINE
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
          </div>
        </div>

        {/* Badges details */}
        <div className="md:col-span-6 glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden group border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-white">Insignias Recientes</h3>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Gamificación</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            
            {/* Unlocked green badge */}
            <div className="aspect-square glass-panel rounded-xl flex flex-col items-center justify-center relative overflow-hidden cursor-pointer bg-white/5 border-emerald-500/20 group/badge">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-100 transition-opacity" />
              <Award className="w-8 h-8 text-emerald-400 mb-1" />
              <span className="text-[8px] uppercase tracking-wider text-emerald-400 font-bold text-center">Héroe Verde</span>
            </div>

            {/* Ocean guardian lock depends on plastic count */}
            <div className={`aspect-square glass-panel rounded-xl flex flex-col items-center justify-center relative overflow-hidden ${isOceanBadgeUnlocked ? 'border-emerald-500/20 bg-white/5' : 'bg-slate-900/40 opacity-45'}`}>
              {isOceanBadgeUnlocked ? (
                <>
                  <Sparkles className="w-8 h-8 text-emerald-400 mb-1" />
                  <span className="text-[8px] uppercase tracking-wider text-emerald-400 font-bold text-center">Océano</span>
                </>
              ) : (
                <>
                  <Lock className="w-7 h-7 text-slate-500 mb-1" />
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold text-center">Bloqueado</span>
                </>
              )}
            </div>

            {/* Standard lock badges */}
            <div className="aspect-square glass-panel rounded-xl flex flex-col items-center justify-center bg-slate-900/40 opacity-40">
              <Lock className="w-7 h-7 text-slate-500 mb-1" />
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold text-center">Bloqueado</span>
            </div>

            <div className="aspect-square glass-panel rounded-xl flex flex-col items-center justify-center bg-slate-900/40 opacity-40">
              <Lock className="w-7 h-7 text-slate-500 mb-1" />
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold text-center">Bloqueado</span>
            </div>

          </div>

          <p className="mt-8 text-sm text-slate-400 italic">
            {isOceanBadgeUnlocked ? (
              <span className="text-emerald-400 font-semibold">
                ✓ ¡Felicidades! Has desbloqueado el logro 'Guardián del Océano'.
              </span>
            ) : (
              `"Estás a ${remainingPlasticDeposits} reciclajes de plástico de desbloquear 'Guardián del Océano'"`
            )}
          </p>
        </div>

        {/* Global Stats */}
        <div className="md:col-span-6 glass-panel rounded-2xl p-6 md:p-8 flex items-center justify-between group overflow-hidden border border-white/5">
          <div className="relative z-10">
            <h3 className="text-xl font-display font-bold text-white mb-1.5">Comunidad Global</h3>
            <p className="text-slate-400 text-xs md:text-sm mb-6">GreenHub ha evitado colectivamente la emisión de:</p>
            
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-display font-black text-emerald-400 glow-text-emerald">42.8M</span>
              <span className="text-lg font-display font-bold text-slate-500">toneladas</span>
            </div>
          </div>

          <div className="relative hidden sm:block">
            <div className="w-28 h-28 rounded-full border-4 border-emerald-500/20 flex items-center justify-center bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Globe className="w-12 h-12 text-emerald-400 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
}
