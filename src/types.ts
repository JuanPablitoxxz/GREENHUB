export type MaterialType = 'plastic' | 'glass' | 'paper' | 'organic' | 'ewaste';

export interface MaterialInfo {
  type: MaterialType;
  label: string;
  iconName: string;
  pointsPerKg: number;
  co2SavedPerKg: number; // in kg
  description: string;
  colorHex: string;
  glowClass: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  location: string;
  pts: number;
}

export interface EcoEvent {
  id: string;
  title: string;
  location: string;
  tag: string; // 'Activo Ahora' | 'Mañana' | 'Pronto'
  tagColor: string; // 'bg-emerald-500' | 'bg-cyan-500' | 'bg-purple-500'
  image: string;
  attendeesCount: number;
  joined: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  desc: string;
  cost: number;
  image: string;
  category: string;
  iconName: string;
  accentColor: string;
  isFeatured?: boolean;
}

export interface DepositRecord {
  id: string;
  material: MaterialType;
  kg: number;
  pointsEarned: number;
  co2Saved: number;
  timestamp: string;
}

export interface AppState {
  credits: number;
  totalRecycledKg: number;
  separationAccuracy: number;
  co2SavedKg: number;
  streakDays: number;
  leaderboard: LeaderboardEntry[];
  events: EcoEvent[];
  rewards: RewardItem[];
  myRedeemedRewards: { rewardId: string; code: string; date: string }[];
  history: DepositRecord[];
}
