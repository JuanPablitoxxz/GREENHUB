import { AppState, MaterialInfo, LeaderboardEntry, EcoEvent, RewardItem } from './types';

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Elena Velásquez', location: 'Bogotá, Colombia', pts: 12450 },
  { rank: 2, name: 'Marcus Thorne', location: 'Berlin, Germany', pts: 11820 },
  { rank: 3, name: 'Sora Kim', location: 'Seoul, S. Korea', pts: 10945 },
  { rank: 4, name: 'Javier Méndez', location: 'Madrid, Spain', pts: 9210 },
  { rank: 5, name: 'Anya Petrova', location: 'Tallinn, Estonia', pts: 8850 }
];

export const INITIAL_EVENTS: EcoEvent[] = [
  {
    id: 'evt-1',
    title: "Limpieza de Playa 'Ola Verde'",
    location: 'Costa del Sol, Málaga',
    tag: 'Activo Ahora',
    tagColor: 'bg-emerald-500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQTaHLnpALQRn15n5z4IRistU9MdtYfwZa6IeFad39ygxxobnp-eFA6JNka0oIOjtLNrmeNjEIBviOkL7g8FID8gayU8AChX-J-OKe2RfH_wKc3NTgqabp9YuyjwfK5N9W0qQMlHeY_dSHvu4yYkj1VNOqh1WpcIMbKxvcvFBz2FJOvSbvXZ55EYTDSNzWXJfyiTVueNAXiYkYnx7Tk7jikvY-4Zq0RWQeHTaTYv5PSEfJQCsKBk5awSffHIDmmqvE6gO8HLyeqc0',
    attendeesCount: 24,
    joined: false
  },
  {
    id: 'evt-2',
    title: 'Reciclatón de E-Waste Urban',
    location: 'Distrito Tecnológico, Madrid',
    tag: 'Mañana',
    tagColor: 'bg-cyan-500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCum9SBtQN7hT3Lb02L8-wefRi_WXXYQAryHHYtHMK7JhNPu-ovw6El8mlgv7KnSlXsTwj58Y_thGcmRROLwse1OATin1WcE0BMIBGDtq7SQLikXQ1WkZOfOC8u9rITWQ4NkA7daisY6zmlH2bIuQW846SmLYjz7u_Y185CadsUTr1VqIfUuPRmc0T4sK6E1d0FeGIJdBrbcoH-B4CmVK56DxDxmfaEjlykc8fftycZwwAqyMwU3rUOlkCiVNz10orxGE_XMqGkweU',
    attendeesCount: 52,
    joined: false
  }
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'rew-1',
    title: 'Siembra de Árboles en la Amazonía',
    desc: 'Planta un árbol en la Amazonía colombiana bajo tu nombre. Recibe coordenadas GPS y un certificado NFT de impacto ambiental.',
    cost: 5000,
    category: 'Mundial',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMljaw8qlCTQrfJ4fl6W1Z8MDshjMEQZ3-dLlLr-NWrGVShe-3KDNORG_iBMQQynntW6bdTlLpaXFvNYdXJBS511-FLKITz_8hs8hQUB3qVeHweorKE4K2MDwvu7uiUE4mt1PRtqEJw46LdMYoy0-Lyx82QAMzNqay34POZRM_V0jDLeJbuV4YsrKue41b5nj-7SM4ihgrXVHy1Ujl1WlUqfHsigo4W2_NmHs5FtsZtfWWFEEjZv85g47kag30y9PaApHVSPz8iEc',
    iconName: 'forest',
    accentColor: 'emerald',
    isFeatured: true
  },
  {
    id: 'rew-2',
    title: 'Medalla Física de Nivel',
    desc: 'Canjea tu medalla física oficial de GreenHub de acuerdo a tu nivel actual. Fabricada con materiales 100% reciclados y certificados.',
    cost: 2500,
    category: 'Exclusivo',
    iconName: 'award',
    accentColor: 'cyan',
    image: ''
  },
  {
    id: 'rew-3',
    title: 'Descuentos en Marcas Sostenibles',
    desc: 'Obtén un 40% de descuento en marcas certificadas B-Corp. Válido en indumentaria, tecnología y alimentación orgánica.',
    cost: 1200,
    category: 'Descuentos',
    iconName: 'eco',
    accentColor: 'purple',
    image: ''
  },
  {
    id: 'rew-4',
    title: 'Neutralidad de Plástico',
    desc: 'Financia la remoción de 10kg de plástico de los océanos. Recibe un reporte digital del impacto generado en ecosistemas marinos.',
    cost: 800,
    category: 'Océanos',
    iconName: 'set_meal',
    accentColor: 'emerald',
    image: ''
  },
  {
    id: 'rew-5',
    title: 'Kit de Optimización de Energía',
    desc: 'Kit de sensores inteligentes para optimizar el consumo eléctrico de tu hogar mediante IA predictiva.',
    cost: 6500,
    category: 'Hogar',
    iconName: 'bolt',
    accentColor: 'cyan',
    image: ''
  }
];

export const MATERIALS: MaterialInfo[] = [
  {
    type: 'plastic',
    label: 'Plástico',
    iconName: 'Sparkles',
    pointsPerKg: 150,
    co2SavedPerKg: 1.5,
    description: 'Botellas de PET, envases y contenedores limpios',
    colorHex: '#10b981',
    glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]'
  },
  {
    type: 'glass',
    label: 'Vidrio',
    iconName: 'Wine',
    pointsPerKg: 100,
    co2SavedPerKg: 1.2,
    description: 'Botellas y frascos de vidrio (sin tapas metálicas)',
    colorHex: '#00e5ff',
    glowClass: 'shadow-[0_0_15px_rgba(0,229,255,0.4)]'
  },
  {
    type: 'paper',
    label: 'Papel y Cartón',
    iconName: 'FileText',
    pointsPerKg: 80,
    co2SavedPerKg: 0.9,
    description: 'Cajas de cartón corrugado, revistas y hojas limpias',
    colorHex: '#a78bfa',
    glowClass: 'shadow-[0_0_15px_rgba(167,139,250,0.4)]'
  },
  {
    type: 'organic',
    label: 'Orgánico',
    iconName: 'Leaf',
    pointsPerKg: 50,
    co2SavedPerKg: 0.7,
    description: 'Residuos de comida y restos de jardín compostables',
    colorHex: '#fbbf24',
    glowClass: 'shadow-[0_0_15px_rgba(251,191,36,0.4)]'
  },
  {
    type: 'ewaste',
    label: 'Residuos Electrónicos',
    iconName: 'Cpu',
    pointsPerKg: 300,
    co2SavedPerKg: 3.5,
    description: 'Baterías, cables, móviles viejos y circuitos',
    colorHex: '#f87171',
    glowClass: 'shadow-[0_0_15px_rgba(248,113,113,0.4)]'
  }
];

export const INITIAL_STATE: AppState = {
  credits: 12840,
  totalRecycledKg: 1240,
  separationAccuracy: 98,
  co2SavedKg: 1284.5, // 1284.5 as in mockup vital metric
  streakDays: 12,
  leaderboard: INITIAL_LEADERBOARD,
  events: INITIAL_EVENTS,
  rewards: INITIAL_REWARDS,
  myRedeemedRewards: [],
  history: [
    {
      id: 'dep-1',
      material: 'plastic',
      kg: 12,
      pointsEarned: 1800,
      co2Saved: 18,
      timestamp: '2026-05-18T14:30:00Z'
    },
    {
      id: 'dep-2',
      material: 'ewaste',
      kg: 2.5,
      pointsEarned: 750,
      co2Saved: 8.75,
      timestamp: '2026-05-19T09:15:00Z'
    },
    {
      id: 'dep-3',
      material: 'glass',
      kg: 8,
      pointsEarned: 800,
      co2Saved: 9.6,
      timestamp: '2026-05-20T17:45:00Z'
    }
  ]
};
