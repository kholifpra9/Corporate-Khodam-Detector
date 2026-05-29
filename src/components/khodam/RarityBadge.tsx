import type { Rarity } from '@/types';

const RARITY_MAP: Record<Rarity, { label: string; bg: string; text: string; glow: string }> = {
  common: {
    label: 'Common',
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    glow: '',
  },
  uncommon: {
    label: 'Uncommon',
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    glow: 'shadow-green-500/20',
  },
  rare: {
    label: 'Rare',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    glow: 'shadow-blue-500/20',
  },
  epic: {
    label: 'Epic',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    glow: 'shadow-purple-500/30',
  },
  legendary: {
    label: 'Legendary',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    glow: 'shadow-amber-500/40',
  },
};

interface RarityBadgeProps {
  rarity: Rarity;
}

export function RarityBadge({ rarity }: RarityBadgeProps) {
  const config = RARITY_MAP[rarity];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.bg} ${config.text} shadow-sm ${config.glow}`}
    >
      {config.label}
    </span>
  );
}
