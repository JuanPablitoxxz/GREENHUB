import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, Train, Tag, Droplet, Zap, CheckCircle, 
  Users, QrCode, Award, Info, X, ShieldAlert, Check
} from 'lucide-react';
import { AppState, RewardItem } from '../types';

interface RewardsViewProps {
  state: AppState;
  onRedeemReward: (rewardId: string, cost: number) => { success: boolean; code?: string; msg?: string };
}

export default function RewardsView({ state, onRedeemReward }: RewardsViewProps) {
  const [successRedeemModal, setSuccessRedeemModal] = useState<{
    reward: RewardItem;
    code: string;
  } | null>(null);

  const [failureMsg, setFailureMsg] = useState<string | null>(null);

  // Constants
  const NEXT_LEVEL_POINTS = 15000;
  const currentCredits = state.credits;
  const pointsToNextLevel = Math.max(0, NEXT_LEVEL_POINTS - currentCredits);
  const progressRatio = Math.min(100, (currentCredits / NEXT_LEVEL_POINTS) * 100);

  const handleRedeemClick = (reward: RewardItem) => {
    const result = onRedeemReward(reward.id, reward.cost);
    if (result.success && result.code) {
      setSuccessRedeemModal({
        reward,
        code: result.code
      });
    } else {
      setFailureMsg(result.msg || 'No tienes suficientes Eco-Créditos para canjear esta recompensa.');
    }
  };

  const renderRewardIcon = (iconName: string, accentColor: string) => {
    const colorClasses: Record<string, string> = {
      emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
      cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.25)]',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
    };

    const style = colorClasses[accentColor] || colorClasses.emerald;

    switch (iconName) {
      case 'forest': return (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style}`}>
          <Sprout className="w-7 h-7" />
        </div>
      );
      case 'award': return (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style}`}>
          <Award className="w-7 h-7" />
        </div>
      );
      case 'eco': return (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style}`}>
          <Tag className="w-7 h-7" />
        </div>
      );
      case 'set_meal': return (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style}`}>
          <Droplet className="w-7 h-7" />
        </div>
      );
      case 'bolt': return (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style}`}>
          <Zap className="w-7 h-7" />
        </div>
      );
      default: return (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${style}`}>
          <CheckCircle className="w-7 h-7" />
        </div>
      );
    }
  };

  return (
    <div className="w-full relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Header & Balance Section */}
      <header className="mb-14 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold block mb-1">Marketplace</span>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4">
            Recompensas
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            Transforma tu impacto ambiental en beneficios tangibles. Canjea tus puntos acumulados por servicios premium, descuentos exclusivos y contribuciones directas a la regeneración del planeta.
          </p>
        </div>

        {/* Dynamic credit balance widget */}
        <div className="glass-panel p-6 rounded-2xl w-full md:w-auto min-w-[325px] border border-emerald-500/20 relative overflow-hidden group shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />
          <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Tu Saldo COP</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-display font-black text-white tracking-tight">
              {currentCredits.toLocaleString()}
            </span>
            <span className="text-emerald-400 font-display font-extrabold text-lg">COP</span>
          </div>

          {/* Level slider */}
          <div className="mt-5 h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressRatio}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" 
            />
          </div>

          <p className="text-slate-500 text-[10px] sm:text-xs mt-3 flex justify-between">
            <span>Explorador Eco</span>
            <span>Próximo nivel: Protector del Bosque (15.000 COP)</span>
          </p>
        </div>
      </header>

      {/* Rewards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Featured Reward: Tree Planting */}
        {state.rewards.filter(r => r.isFeatured).map((item) => (
          <section 
            key={item.id}
            className="md:col-span-8 group relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-end min-h-[460px] transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/20"
          >
            <div className="absolute inset-0 z-0">
              <img 
                alt={item.title} 
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-1000" 
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/70 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                {renderRewardIcon(item.iconName, item.accentColor)}
                <span className="bg-emerald-500/20 text-emerald-400 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Iniciativa Destacada
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
                {item.title}
              </h2>
              
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed mb-6">
                {item.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button 
                  onClick={() => handleRedeemClick(item)}
                  className="bg-emerald-500 text-slate-950 font-display font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95 text-xs text-center"
                >
                  Canjear ({item.cost.toLocaleString()} COP)
                </button>
                <div className="text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>1,240 personas han participado</span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Regular Rewards list */}
        {state.rewards.filter(r => !r.isFeatured).map((item) => (
          <section 
            key={item.id}
            className="md:col-span-4 glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] border border-white/5 hover:border-cyan-500/15 group"
          >
            <div>
              <div className="mb-6">
                {renderRewardIcon(item.iconName, item.accentColor)}
              </div>
              
              <h3 className="text-xl font-display font-extrabold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
                {item.desc}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
              <span className={`font-display font-black text-sm sm:text-base ${
                item.accentColor === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
              }`}>
                {item.cost.toLocaleString()} COP
              </span>
              <button 
                onClick={() => handleRedeemClick(item)}
                className="text-white text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent font-bold transition-all"
              >
                Canjear
              </button>
            </div>
          </section>
        ))}

      </div>

      {/* Camino a la Maestría Ambiental Section */}
      <div className="mt-20 glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          
          <div className="w-44 h-44 relative flex-shrink-0">
            <svg className="w-full h-full -rotate-90 text-slate-800" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="42" stroke="currentColor" strokeWidth="6" />
              <motion.circle 
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * progressRatio) / 100 }}
                transition={{ duration: 1.5 }}
                className="text-emerald-500" 
                cx="50" 
                cy="50" 
                fill="transparent" 
                r="42" 
                stroke="currentColor" 
                strokeDasharray="264" 
                strokeLinecap="round" 
                strokeWidth="7" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-display font-black text-white">Nivel 4</span>
              <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">Explorador Eco</span>
            </div>
          </div>

          <div className="flex-grow text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight">
              Camino a la Maestría Ambiental
            </h3>
            <p className="text-slate-400 text-sm max-w-xl mb-6">
              Estás a solo <span className="text-emerald-400 font-bold">{pointsToNextLevel.toLocaleString()} COP</span> de desbloquear el nivel 'Protector del Bosque', el cual te otorga un 15% extra de créditos por cada acción de reciclaje.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="glass-panel px-4 py-2 rounded-full border border-white/5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-sans font-bold text-slate-300">Reciclaje Diario (STREAK 12)</span>
              </div>
              <div className="glass-panel px-4 py-2 rounded-full border border-white/5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-sans font-bold text-slate-300">Consumo Bajo (3 MESES)</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-28 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Right total stats inside bottom panel */}
          <div className="text-center lg:text-right flex-shrink-0">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Impacto Total</p>
            <p className="text-3xl font-display font-black text-white mb-4">420 kg CO₂</p>
            <button 
              onClick={() => alert("¡Pronto disponible! El registro completo histórico de las huellas de carbono de tu hogar.")}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 outline-none text-xs ml-auto"
            >
              Ver Estadísticas Completas
              <span className="text-xs">➔</span>
            </button>
          </div>
        </div>
      </div>

      {/* REWARD REDEEMED CODE SUCCESS MODAL */}
      <AnimatePresence>
        {successRedeemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel p-6 rounded-2xl max-w-sm w-full bg-slate-910 border border-emerald-500/20 text-white text-center relative"
            >
              <button 
                onClick={() => setSuccessRedeemModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <QrCode className="w-7 h-7" />
              </div>

              <span className="text-emerald-400 text-[10px] font-semibold uppercase tracking-widest block mb-1">✓ Canje Realizado</span>
              
              <h4 className="text-lg font-display font-bold text-white mb-2">
                {successRedeemModal.reward.title}
              </h4>

              <p className="text-slate-400 text-xs mb-6 max-w-xs mx-auto">
                Se han descontado <strong>{successRedeemModal.reward.cost.toLocaleString()} COP</strong> de tu saldo. Presenta este cupón en el punto oficial para redimir tu beneficio:
              </p>

              {/* Coupon ticket code */}
              <div className="bg-slate-950 rounded-xl p-4 border border-emerald-500/20 mb-6 font-mono tracking-wider text-emerald-400 text-lg font-black select-all select-none">
                {successRedeemModal.code}
              </div>

              <div className="text-[10px] text-slate-500 mb-6">
                Código generado el {new Date().toLocaleDateString('es-ES')}. Válido por 30 días.
              </div>

              <button 
                onClick={() => setSuccessRedeemModal(null)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Cerrar y Regresar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ERROR MODAL DIALOG */}
      <AnimatePresence>
        {failureMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel p-6 rounded-2xl max-w-sm w-full bg-slate-900 border border-rose-500/20 text-white text-center relative"
            >
              <button 
                onClick={() => setFailureMsg(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                <ShieldAlert className="w-7 h-7" />
              </div>

              <h4 className="text-lg font-display font-bold text-white mb-2">
                Fondos Insuficientes
              </h4>

              <p className="text-slate-400 text-xs mb-6">
                {failureMsg}
              </p>

              <button 
                onClick={() => setFailureMsg(null)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
