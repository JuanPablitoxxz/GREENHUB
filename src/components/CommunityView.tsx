import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, SlidersHorizontal, Map, Flame, Calendar, MapPin, 
  Check, Info, X, Share2, Award, Heart
} from 'lucide-react';
import { AppState, EcoEvent } from '../types';

interface CommunityViewProps {
  state: AppState;
  onJoinEvent: (eventId: string) => void;
}

export default function CommunityView({ state, onJoinEvent }: CommunityViewProps) {
  const [globalCounter, setGlobalCounter] = useState(1429843);
  const [selectedStory, setSelectedStory] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState<EcoEvent | null>(null);
  const [filterJoined, setFilterJoined] = useState(false);

  // Ticking global telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleEvents = filterJoined ? state.events.filter(e => e.joined) : state.events;

  return (
    <div className="w-full relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Hero / Global Counter */}
      <header className="mb-14 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold block mb-1">Telemetría</span>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-4 text-white">
          Comunidad <span className="text-emerald-500">Global</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base mb-10 font-light">
          Conectando visionarios ecológicos para restaurar el equilibrio de nuestro planeta a través de acciones colectivas descentralizadas.
        </p>

        {/* Dynamic global recycled counter */}
        <div className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden group">
          <div className="absolute -top-20 -left-20 w-52 h-52 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Total de Residuos Reciclados Globalmente
            </span>
            <div className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] select-all selection:bg-emerald-500">
              {globalCounter.toLocaleString()}
            </div>
            <span className="text-emerald-500 font-display font-black text-lg md:text-xl mt-3 tracking-[0.1em]">
              KILOGRAMOS
            </span>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Eco-Warriors Leaderboard */}
        <section className="lg:col-span-4 glass-panel rounded-2xl p-5 md:p-6 flex flex-col justify-between border border-white/5 shadow-xl h-full">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">Líderes de Impacto</h2>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
              {state.leaderboard.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-emerald-500/5 hover:border-emerald-500/10 transition-all duration-300 group"
                >
                  {/* Position Badge */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-display font-black text-sm mr-3.5 border ${
                    item.rank === 1 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/35' 
                      : 'bg-slate-850 text-slate-400 border-white/5'
                  }`}>
                    {item.rank}
                  </div>

                  <div className="flex-grow">
                    <p className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-500">{item.location}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-emerald-400 font-display font-black text-sm">
                      {item.pts.toLocaleString()}
                    </p>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">PTS</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button 
              className="w-full py-3.5 border border-white/10 rounded-xl text-slate-400 hover:text-white font-bold hover:bg-white/5 transition-all outline-none text-xs"
              onClick={() => alert("¡Has cargado los 100 líderes globales! Mantente reciclando para subir en la tabla de clasificación.")}
            >
              Ver Ranking Completo
            </button>
          </div>
        </section>

        {/* Community Feed / Local Events */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-display font-extrabold text-white">Eventos Cercanos</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilterJoined(!filterJoined)}
                className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                  filterJoined 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : 'glass-panel hover:bg-slate-800 border-white/5 text-slate-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {filterJoined ? 'Inscritos' : 'Filtros'}
              </button>
              <button 
                onClick={() => alert("Abrir vista de mapa satelital satélite GreenHub...")}
                className="p-2 rounded-xl glass-panel hover:bg-slate-800 border-white/5 text-slate-400 transition-all"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {visibleEvents.map((evt) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={evt.id}
                  className="glass-panel overflow-hidden rounded-2xl group transition-all duration-500 hover:-translate-y-1.5 border border-white/5 flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={evt.image} 
                      alt={evt.title} 
                    />
                    <span className={`absolute top-4 left-4 text-slate-950 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${evt.tagColor}`}>
                      {evt.joined ? 'Inscrito' : evt.tag}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-base font-display font-bold text-white mb-1.5 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {evt.title}
                      </h3>
                      <div className="flex items-center text-slate-400 text-xs gap-1.5 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {evt.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Avatar queue mockup */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700" />
                          <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-slate-950">
                            +{evt.attendeesCount}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">Participantes</span>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedEventDetails(evt)}
                          className="p-1 px-3 text-[11px] font-bold border border-white/10 hover:bg-white/5 text-slate-300 rounded-lg transition-all"
                        >
                          Info
                        </button>
                        <button 
                          onClick={() => onJoinEvent(evt.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            evt.joined
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                          }`}
                        >
                          {evt.joined ? (
                            <>
                              <Check className="w-3 h-3" />
                              Unido
                            </>
                          ) : (
                            'Unirse'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Large Featured Post: vertical forest completed case study */}
          <article className="glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row border border-white/5 shadow-xl hover:border-emerald-500/15 duration-500">
            <div className="md:w-1/2 h-52 md:h-auto overflow-hidden bg-slate-950">
              <img 
                className="w-full h-full object-cover opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYtsYEuaUFi6a6NJFSMkI5qb-INDCWk_rDFcIriIVgV7mbme5OHTWmHZfJhBNqYRHk-DpCBNeHswJf0t_nK0uueS2RA41rvIHiskWW-0ZGwO8dLqRlwmFqSotddCwdKNmuJArtXbvbTWHGPTd4GOzw9crysBsmYxwmao7yLShrfh6LLRsGDYLywYydLf4H4nOny_JM_WZLhEkApLtvYSIGb8bR6ArfAu3xi1tFFgVph4Bcb88tulp4HIHf_w74tUqAMZlcv31nj28"
                alt="Proyecto Bosque Vertical" 
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                Hito de Comunidad
              </span>
              <h3 className="text-2xl font-display font-bold text-white mb-3 leading-tight">
                Proyecto 'Bosque Vertical' Completado
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Gracias al esfuerzo de 1,200 voluntarios locales, hemos finalizado la siembra del primer micro-ecosistema automatizado en el centro de la ciudad.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button 
                  onClick={() => setSelectedStory(true)}
                  className="bg-emerald-500 text-slate-950 px-5  py-2.5 rounded-lg text-xs font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Leer Historia
                </button>
                <span className="text-slate-500 text-xs">Publicado hace 2 horas</span>
              </div>
            </div>
          </article>

        </section>

      </div>

      {/* STORY MODAL DIALOG */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel p-6 rounded-2xl max-w-lg w-full bg-slate-900 border border-purple-500/20 text-white relative"
            >
              <button 
                onClick={() => setSelectedStory(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">Impacto Realizado</span>
              
              <h3 className="text-2xl font-display font-extrabold text-white mb-4">
                El Bosque Vertical Automatizado
              </h3>

              <div className="rounded-xl overflow-hidden mb-4 max-h-48">
                <img 
                  className="w-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYtsYEuaUFi6a6NJFSMkI5qb-INDCWk_rDFcIriIVgV7mbme5OHTWmHZfJhBNqYRHk-DpCBNeHswJf0t_nK0uueS2RA41rvIHiskWW-0ZGwO8dLqRlwmFqSotddCwdKNmuJArtXbvbTWHGPTd4GOzw9crysBsmYxwmao7yLShrfh6LLRsGDYLywYydLf4H4nOny_JM_WZLhEkApLtvYSIGb8bR6ArfAu3xi1tFFgVph4Bcb88tulp4HIHf_w74tUqAMZlcv31nj28" 
                  alt="Bosque" 
                />
              </div>

              <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed max-h-[180px] overflow-y-auto pr-1">
                <p>
                  El proyecto 'Bosque Vertical' es una iniciativa pionera de GreenHub en colaboración con el Ayuntamiento y más de 1,200 voluntarios vecinales. Consiste en la instalación de un jardín colgante en fachada que purifica el aire de forma activa gracias a sensores biológicos y sistemas de microrriego alimentados por energía de compostaje orgánico.
                </p>
                <p>
                  Se calcula que este bosque ahorrará más de 15,000 kg de emisiones de CO2 al año y reducirá la temperatura ambiental de la manzana por 2.5 grados. ¡Es el ejemplo perfecto de cómo tus pequeños depositos cotidianos en GreenHub se canalizan hacia grandes obras de reforestación urbana!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end gap-2 text-xs">
                <button 
                  onClick={() => {
                    alert("¡Enlace copiado al portapapeles! Comparte la revolución verde.");
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <Share2 className="w-4.5 h-4.5" />
                  Compartir
                </button>
                <button 
                  onClick={() => setSelectedStory(false)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EVENT INFO DETAILS MODAL DIALOG */}
      <AnimatePresence>
        {selectedEventDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel p-6 rounded-2xl max-w-md w-full bg-slate-900 border border-cyan-500/20 text-white relative"
            >
              <button 
                onClick={() => setSelectedEventDetails(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  Detalles del Evento
                </span>
              </div>
              
              <h3 className="text-xl font-display font-extrabold text-white mb-4">
                {selectedEventDetails.title}
              </h3>

              <div className="rounded-xl overflow-hidden mb-4">
                <img 
                  className="w-full object-cover max-h-40" 
                  src={selectedEventDetails.image} 
                  alt={selectedEventDetails.title} 
                />
              </div>

              <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <strong>Lugar:</strong> {selectedEventDetails.location}
                </div>
                <p>
                  Únete a nuestro escuadrón comunitario GreenHub. Recolectamos materiales, clasificamos con alta pureza bajo guía técnica y canjeamos puntos extra de bonificación para todos los participantes que asistan.
                </p>
                <p className="text-xs bg-slate-950/60 p-2.5 rounded-lg text-emerald-400 border border-emerald-500/10">
                  ⚡ ¡Bono de evento! Registro presencial otorga +250 COP extra para tu perfil.
                </p>
              </div>

              <div className="flex justify-end gap-2.5 text-xs">
                <button 
                  onClick={() => setSelectedEventDetails(null)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-slate-300 font-bold"
                >
                  Cerrar
                </button>
                <button 
                  onClick={() => {
                    onJoinEvent(selectedEventDetails.id);
                    // update initial state
                    setSelectedEventDetails(prev => prev ? { ...prev, joined: !prev.joined, attendeesCount: prev.joined ? prev.attendeesCount - 1 : prev.attendeesCount + 1 } : null);
                  }}
                  className={`px-5 py-2.5 rounded-lg font-bold transition-all ${
                    selectedEventDetails.joined
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {selectedEventDetails.joined ? 'Inscrito ✓' : 'Inscribirse ahora'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
