import { useState } from 'react';
import { INITIAL_STATE } from './data';
import { AppState, DepositRecord } from './types';
import BackgroundParticles from './components/BackgroundParticles';
import Navigation from './components/Navigation';
import LaunchModal from './components/LaunchModal';
import DashboardView from './components/DashboardView';
import ImpactView from './components/ImpactView';
import CommunityView from './components/CommunityView';
import RewardsView from './components/RewardsView';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isLaunchOpen, setIsLaunchOpen] = useState<boolean>(false);

  // Success Deposit logic - increments user state in live mode
  const handleSuccessDeposit = (record: DepositRecord) => {
    setState((prev) => {
      // Create new history array
      const nextHistory = [record, ...prev.history];
      
      // Calculate active separation accuracy based on history
      // e.g., organic deposits might lower accuracy slightly, whereas plastic is 98%
      const accuracyScore = record.material === 'organic' ? 92 : 98;
      const nextAccuracy = Math.round(
        ((prev.separationAccuracy * prev.history.length) + accuracyScore) / (prev.history.length + 1)
      );

      return {
        ...prev,
        credits: prev.credits + record.pointsEarned,
        totalRecycledKg: prev.totalRecycledKg + record.kg,
        co2SavedKg: parseFloat((prev.co2SavedKg + record.co2Saved).toFixed(1)),
        separationAccuracy: nextAccuracy,
        history: nextHistory,
        streakDays: prev.streakDays + 1
      };
    });
  };

  // Redeeming Eco-Credits logic with dynamically generated voucher tags
  const handleRedeemReward = (rewardId: string, cost: number) => {
    if (state.credits < cost) {
      return { success: false, msg: 'No tienes suficientes Eco-Créditos. ¡Deposita más materiales en el GreenHub Receptacle para acumular créditos!' };
    }

    const uniqueCode = `GH-${rewardId.toUpperCase().replace('REW-', '')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    setState((prev) => ({
      ...prev,
      credits: prev.credits - cost,
      myRedeemedRewards: [
        { rewardId, code: uniqueCode, date: new Date().toISOString() },
        ...prev.myRedeemedRewards
      ]
    }));

    return { 
      success: true, 
      code: uniqueCode 
    };
  };

  // Event joining toggling logic
  const handleJoinEvent = (eventId: string) => {
    setState((prev) => {
      const nextEvents = prev.events.map((evt) => {
        if (evt.id === eventId) {
          const joined = !evt.joined;
          return {
            ...evt,
            joined,
            attendeesCount: joined ? evt.attendeesCount + 1 : evt.attendeesCount - 1
          };
        }
        return evt;
      });
      return {
        ...prev,
        events: nextEvents
      };
    });
  };

  return (
    <div className="relative min-h-screen bg-base-canvas text-white overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">
      <CustomCursor />
      
      {/* Decorative bioluminescent mesh and particles */}
      <BackgroundParticles />
      <div className="grid-overlay fixed inset-0 opacity-40 z-0 pointer-events-none" />
      
      {/* Absolute background color accent blur layers */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Floating Header Toolbar */}
      <Navigation 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        onLaunchClick={() => setIsLaunchOpen(true)}
        userCredits={state.credits}
      />

      {/* Content views switcher */}
      <main className="relative z-10 w-full">
        {currentTab === 'dashboard' && (
          <DashboardView 
            onLaunchClick={() => setIsLaunchOpen(true)} 
            onTabChange={setCurrentTab}
            recycledKg={state.totalRecycledKg}
            accuracy={state.separationAccuracy}
            co2Saved={state.co2SavedKg}
          />
        )}

        {currentTab === 'impact' && (
          <ImpactView state={state} />
        )}

        {currentTab === 'community' && (
          <CommunityView state={state} onJoinEvent={handleJoinEvent} />
        )}

        {currentTab === 'rewards' && (
          <RewardsView state={state} onRedeemReward={handleRedeemReward} />
        )}
      </main>

      {/* Reusable dialog overlay elements */}
      <LaunchModal 
        isOpen={isLaunchOpen}
        onClose={() => setIsLaunchOpen(false)}
        onSuccessDeposit={handleSuccessDeposit}
      />

      {/* Micro Status footer */}
      <footer className="relative z-10 py-10 text-center text-xs text-slate-600 border-t border-white/5 bg-slate-950/20">
        <p>© 2026 GreenHub Decentralized Eco-Network. All rights reserved.</p>
        <p className="mt-1 font-mono text-[9px] text-slate-700">NODE_VER // 4.19.0-MAINNET</p>
      </footer>
    </div>
  );
}
