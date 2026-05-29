import { KHODAM_DATABASE } from '@/data/khodam-database';
import { generateSeed } from './seed';
import { determineRarity, generateAttributes, getRoleIndex, generateSignature } from './utils';
import type { JobRole, GeneratorResult } from '@/types';

export function generateKhodam(name: string, role: JobRole): GeneratorResult {
  const roleIndex = getRoleIndex(role);
  const seed = generateSeed(name, roleIndex);
  const rarity = determineRarity(seed);
  const signature = generateSignature(seed);

  const candidates = KHODAM_DATABASE.filter((k) => k.rarity === rarity);

  let khodam;
  if (candidates.length === 0) {
    khodam = KHODAM_DATABASE[seed % KHODAM_DATABASE.length];
  } else {
    const index = seed % candidates.length;
    khodam = candidates[index];
  }

  return {
    name,
    role,
    khodam: {
      ...khodam,
      attributes: generateAttributes(seed),
    },
    seed,
    signature,
  };
}
