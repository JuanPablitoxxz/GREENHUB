import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, Trash2, Cpu, FileText, Leaf, Wine, 
  CheckCircle, Loader2, ArrowRight, RotateCcw
} from 'lucide-react';
import { MATERIALS } from '../data';
import { MaterialType, DepositRecord } from '../types';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessDeposit: (record: DepositRecord) => void;
}

export default function LaunchModal({ isOpen, onClose, onSuccessDeposit }: LaunchModalProps) {
  const [step, setStep] = useState(1); // 1 = select material, 2 = configure weight, 3 = simulate scan, 4 = success
  const [selectedType, setSelectedType] = useState<MaterialType>('plastic');
  const [weight, setWeight] = useState<number>(2.5);
  const [scannedImage, setScannedImage] = useState<string>('');

  const currentMaterial = MATERIALS.find(m => m.type === selectedType) || MATERIALS[0];
  const pointsEarned = Math.round(weight * currentMaterial.pointsPerKg);
  const co2Averted = parseFloat((weight * currentMaterial.co2SavedPerKg).toFixed(1));

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSelectedType('plastic');
      setWeight(2.5);
    }
  }, [isOpen]);

  // Set scanning simulation
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        const record: DepositRecord = {
          id: 'dep-' + Date.now(),
          material: selectedType,
          kg: weight,
          pointsEarned,
          co2Saved: co2Averted,
          timestamp: new Date().toISOString()
        };
        onSuccessDeposit(record);
        setStep(4);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!isOpen) return null;

  const renderIcon = (type: MaterialType, className = "w-6 h-6") => {
    switch (type) {
      case 'plastic': return <Sparkles className={className} />;
      case 'glass': return <Wine className={className} />;
      case 'paper': return <FileText className={className} />;
      case 'organic': return <Leaf className={className} />;
      case 'ewaste': return <Cpu className={className} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel border border-emerald-500/20 shadow-2xl bg-slate-900/90 text-white"
        id="launch-generator-modal"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-display font-extrabold tracking-tight text-white">
              Contenedor GreenHub
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
            id="close-modal-btn"
          >
            ✕
          </button>
        </div>

        {/* Modal content steps */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-4">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">Paso 1 de 3</span>
                  <h3 className="text-lg font-bold">¿Qué residuo vas a depositar?</h3>
                  <p className="text-slate-400 text-sm">Selecciona la categoría para calibrar las cámaras holográficas.</p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {MATERIALS.map((mat) => (
                    <button
                      key={mat.type}
                      onClick={() => setSelectedType(mat.type)}
                      className={`flex items-center p-3 text-left rounded-xl border transition-all duration-300 group ${
                        selectedType === mat.type 
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                          : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="p-2.5 rounded-lg mr-4" style={{ backgroundColor: `${mat.colorHex}20`, color: mat.colorHex }}>
                        {renderIcon(mat.type, "w-5 h-5")}
                      </div>
                      <div className="flex-grow">
                        <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                          {mat.label}
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5 line-clamp-1">{mat.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold text-xs">+{mat.pointsPerKg} COP/kg</div>
                        <div className="text-slate-500 text-[10px]">-{mat.co2SavedPerKg}kg CO₂</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    Siguiente paso
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Paso 2 de 3</span>
                  <h3 className="text-lg font-bold">Establecer Peso Aproximado</h3>
                  <p className="text-slate-400 text-sm">Desliza o ingresa los kilogramos que depositarás en el Eco-Nodo.</p>
                </div>

                {/* Info summary of chosen material */}
                <div className="flex items-center p-3 bg-white/5 border border-white/5 rounded-xl mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mr-3">
                    {renderIcon(selectedType, "w-5 h-5")}
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Categoría Ajustada</span>
                    <span className="font-bold text-sm">{currentMaterial.label}</span>
                  </div>
                </div>

                {/* Weight selection feedback */}
                <div className="text-center py-6 bg-slate-950/40 rounded-xl mb-6 border border-white/5 relative">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-2">Masa Estimada</span>
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-5xl font-display font-extrabold text-white tracking-tight">{weight}</span>
                    <span className="text-xl font-bold text-emerald-400">kg</span>
                  </div>
                </div>

                <input 
                  type="range" 
                  min="0.2" 
                  max="30" 
                  step="0.1" 
                  value={weight} 
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-2 mb-8 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                {/* Accumulators projection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">Créditos de Impacto</span>
                    <span className="text-2xl font-display font-extrabold text-white">+{pointsEarned} <span className="text-xs font-semibold text-emerald-400">COP</span></span>
                  </div>
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-1">Evitado CO₂</span>
                    <span className="text-2xl font-display font-extrabold text-white">-{co2Averted} <span className="text-xs font-semibold text-cyan-400">kg</span></span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold rounded-lg transition-colors border border-white/5"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    Depositar e Iniciar Escaneo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                {/* Visual scan container simulating digital inspection */}
                <div className="relative w-44 h-44 mx-auto mb-6 bg-slate-950 rounded-2xl overflow-hidden border border-emerald-500/30 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
                  
                  {/* Rotating loader circle */}
                  <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
                  
                  {/* Floating material icon */}
                  <div className="absolute inset-0 flex items-center justify-center scale-125 opacity-20 select-none">
                    {renderIcon(selectedType, "w-10 h-10 text-emerald-400")}
                  </div>

                  {/* Laser bar animation that scans up and down */}
                  <motion.div 
                    animate={{ y: [-70, 70] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_#10b981,0_0_20px_#10b981]"
                  />
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2 animate-pulse glow-text-emerald">
                  Analizando Depósito...
                </h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                  La cámara con visión artificial está identificando la densidad de {currentMaterial.label.toLowerCase()} y verificando la pureza al 98%.
                </p>
                <div className="mt-6 flex justify-center gap-4 text-xs font-mono text-emerald-400 bg-slate-950/65 py-2 px-4 rounded-lg border border-emerald-500/10">
                  <span>CAMERA_01 // OK</span>
                  <span>SPECTRO_CALIBRATED</span>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 mx-auto bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border-2 border-emerald-500 mb-6 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-display font-extrabold tracking-tight text-white mb-1">
                  ¡Procesado con Éxito!
                </h3>
                <p className="text-emerald-400 font-bold mb-6">
                  Separación Homologada {currentMaterial.type === 'organic' ? '92%' : '98%'} de Pureza
                </p>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 mb-8 max-w-sm mx-auto">
                  <div className="grid grid-cols-3 divide-x divide-white/5 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">Masa</span>
                      <span className="text-xl font-display font-extrabold text-white">{weight} kg</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">Créditos</span>
                      <span className="text-xl font-display font-extrabold text-emerald-400">+{pointsEarned} COP</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">CO₂</span>
                      <span className="text-xl font-display font-extrabold text-cyan-400">-{co2Averted} kg</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-xs max-w-xs mx-auto mb-6">
                  Tus datos de impacto ambiental y tu saldo COP se han actualizado instantáneamente en la red GreenHub. ¡Buen trabajo!
                </p>

                <div className="flex gap-4 max-w-xs mx-auto">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-white/5 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Otro Depósito
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:scale-105 active:scale-95 transition-all text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    Volver al Panel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
