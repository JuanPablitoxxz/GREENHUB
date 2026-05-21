import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Recycle, ShieldCheck, Leaf, Sparkles, ChevronRight } from 'lucide-react';

interface DashboardViewProps {
  onLaunchClick: () => void;
  onTabChange: (tab: string) => void;
  recycledKg: number;
  accuracy: number;
  co2Saved: number;
}

export default function DashboardView({ onLaunchClick, onTabChange, recycledKg, accuracy, co2Saved }: DashboardViewProps) {
  const [animatedRecycled, setAnimatedRecycled] = useState(0);
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  const [animatedCO2, setAnimatedCO2] = useState(0);

  useEffect(() => {
    // Tick animations for dashboard metrics
    const duration = 1500;
    const steps = 60;
    const delay = duration / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedRecycled(Math.round(recycledKg * progress));
      setAnimatedAccuracy(Math.round(accuracy * progress));
      setAnimatedCO2(Math.round(co2Saved * progress));

      if (step >= steps) {
        setAnimatedRecycled(recycledKg);
        setAnimatedAccuracy(accuracy);
        setAnimatedCO2(co2Saved);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [recycledKg, accuracy, co2Saved]);

  return (
    <div className="w-full relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen pt-36 md:pt-40 pb-16 px-4 flex flex-col items-center justify-center text-center hero-gradient max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6 md:space-y-8"
        >
          {/* Pulsing Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/80 font-sans">
              El Futuro de la Sostenibilidad está Aquí
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05] glow-text-emerald">
            Reinventando los <span className="text-emerald-400">Residuos</span> Urbanos, Juntos.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Únete al ecosistema ambiental de próxima generación. Transformamos las acciones cotidianas en conjuntos residenciales en recompensas y motivacion.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onLaunchClick}
              className="group relative px-8 py-4.5 bg-emerald-500 text-slate-950 font-display font-extrabold text-base md:text-lg rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Iniciar GreenHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
            <button 
              onClick={() => onTabChange('impact')}
              className="px-6 py-4 rounded-full border border-white/10 hover:border-emerald-500/40 hover:bg-white/5 transition-all outline-none font-semibold text-slate-300 hover:text-white"
            >
              Ver Estadísticas
            </button>
          </div>
        </motion.div>

        {/* Floating Metrics Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 w-full max-w-5xl"
        >
          <div className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 shadow-2xl border-t border-l border-white/10">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
              <div className="flex items-center gap-3 text-emerald-400 mb-1.5">
                <Recycle className="w-7 h-7" />
                <span className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
                  {animatedRecycled.toLocaleString()} kg
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Reciclado
              </span>
            </div>

            <div className="h-10 w-px bg-white/10 hidden md:block"></div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
              <div className="flex items-center gap-3 text-cyan-400 mb-1.5">
                <ShieldCheck className="w-7 h-7" />
                <span className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
                  {animatedAccuracy}%
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Precisión de Separación
              </span>
            </div>

            <div className="h-10 w-px bg-white/10 hidden md:block"></div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
              <div className="flex items-center gap-3 text-purple-400 mb-1.5">
                <Leaf className="w-7 h-7" />
                <span className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
                  {animatedCO2.toLocaleString()} kg
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                CO₂ Ahorrado
              </span>
            </div>

          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-5">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Collection */}
          <div className="group relative p-8 md:p-10 glass-panel rounded-2xl hover:-translate-y-2.5 transition-all duration-500 border border-white/5 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Recycle className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Recolección</h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                Deberás subir registro fotográfico de todo el material depositado para ser analizado y aprobado .
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl aspect-video glass-panel border border-white/5 relative">
              <img 
                alt="Contenedor de residuos futurista" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK-lL57cEOG01U_Zm7VfR2NoUCSADVFHdtwS4H1NyC6b9srL0ZdppjY3vzFWVHx1vMzR4K08r6SliKeVo1k0Y2UI2_8EOF_thb5X5u5y8vNjoH_QbAE6UsyNomdcmNf05rj3pfF8Lgm2VaBGMWaHWfus5wFB-KQxGSPJg1jICNHFptxJ0s4yFLp7k7_TR43wyRTDnQqfGrgY_bxhtdl1cvF6vL0A2U9VdhGL-6lPhtN394yOQPqTNkXn7xu0kpIJ-k2wcei8Zx84k"
              />
            </div>
          </div>

          {/* Column 2: Separation */}
          <div className="group relative p-8 md:p-10 glass-panel rounded-2xl hover:-translate-y-2.5 transition-all duration-500 border border-white/5 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Separación</h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                La clasificación se llevara viendo y analizando desecho por desecho para garantizar un 90% menos de desperdicio.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl aspect-video glass-panel border border-white/5 relative">
              <img 
                alt="Clasificación holográfica" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjjwjrhunu0ANp6kC6vxR_DsGNQzeBzO-DxA4TtDIizAcuVIBR8xq0IBdFekJbTn_sCDAVl-IIvmGLHTVwOJHUKNP77L3mBzVTlB9yabDejDJUNrRSEagEqRMQd5T4mfH66nBDDBGt1-E8Vl-azvi8S45s_j2UJV29yVGbdHTEd0B2DKA8AYJg9VXQrGLBHvAzSvQcOopoyz_Xx6eIacelBEAGbmhn3KtUKj8YfMn7plZO59m1qWw6Md_6AIEE_IiTO_TslJN3VGk"
              />
            </div>
          </div>

          {/* Column 3: Reward */}
          <div className="group relative p-8 md:p-10 glass-panel rounded-2xl hover:-translate-y-2.5 transition-all duration-500 border border-white/5 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Recompensa</h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                Convierte tu impacto en COP para obtener servicios, transporte y beneficios comunitarios.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl aspect-video glass-panel border border-white/5 relative">
              <img 
                alt="Recompensas digitales" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqe9XPB-fxp4SBL9l-jspoY-LCMNtTyzIYwsNl0Ijmo4gzJWWA4Ack9CFpFW5PkhqT7FErRTzCuE1aPOnTgvyqvEzYotbXalLTncdVrbTGBgqQJQyokL0oqN-CHE6EAmkr88WEORAE3n1yl3eBDLxP34fRUznkI72MbgOQiQnJn05kbq0TrwM6cS1jsR9cEQ68A4qZ-IUaom6PiTPaOcEe0Wl_vkgqRCwkSyrFhhovj8Fatuj8FJidAmtOa_DyDI-BftZCrZMAgXc"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
