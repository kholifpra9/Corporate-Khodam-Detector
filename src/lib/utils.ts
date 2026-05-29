import { type Rarity, RARITY_CONFIG, type JobRole, JOB_ROLES } from '@/types';

export function determineRarity(seed: number): Rarity {
  const totalWeight = Object.values(RARITY_CONFIG).reduce((sum, c) => sum + c.weight, 0);
  const roll = seed % totalWeight;
  let cumulative = 0;

  for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
    cumulative += config.weight;
    if (roll < cumulative) return rarity as Rarity;
  }

  return 'common';
}

export function generateAttributes(seed: number, count = 5): { name: string; value: number }[] {
  const possibleAttributes = [
    'Kekuatan Coding',
    'Kecepatan Meeting',
    'Ketahanan Deadline',
    'Maneuver Politik',
    'Kharisma Presentasi',
    'Insting Debugging',
    'Kecerdasan Data',
    'Keberanian Deploy',
    'Kreativitas Desain',
    'Ketenangan Negosiasi',
    'Ketajaman Analisa',
    'Kecepatan Belajar',
  ];

  const selected: { name: string; value: number }[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < count; i++) {
    let idx = (seed * (i + 1) * 31 + i * 7) % possibleAttributes.length;
    while (usedIndices.has(idx)) {
      idx = (idx + 1) % possibleAttributes.length;
    }
    usedIndices.add(idx);

    const value = ((seed * (i + 1) * 13 + i * 31) % 41) + 60;
    selected.push({ name: possibleAttributes[idx], value: Math.min(value, 100) });
  }

  return selected;
}

export function getRoleIndex(role: JobRole): number {
  const idx = JOB_ROLES.findIndex((r) => r.value === role);
  return idx >= 0 ? idx : 0;
}

export function generateSignature(seed: number): string {
  const chars = '0123456789ABCDEF';
  let sig = '';
  let s = seed;
  for (let i = 0; i < 8; i++) {
    sig = chars[s % 16] + sig;
    s = Math.floor(s / 16);
  }
  return sig;
}
