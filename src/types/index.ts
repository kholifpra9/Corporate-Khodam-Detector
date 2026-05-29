export type JobRole =
  | 'software-engineer'
  | 'product-manager'
  | 'designer'
  | 'data-scientist'
  | 'devops'
  | 'ceo'
  | 'cto'
  | 'hr'
  | 'marketing'
  | 'finance'
  | 'intern'
  | 'consultant';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface KhodamAttribute {
  name: string;
  value: number;
}

export interface KhodamEntity {
  id: string;
  name: string;
  title: string;
  description: string;
  rarity: Rarity;
  element: string;
  attributes: KhodamAttribute[];
  quote: string;
  emoji: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface FormData {
  fullName: string;
  jobRole: JobRole | '';
}

export interface GeneratorResult {
  name: string;
  role: JobRole;
  khodam: KhodamEntity;
  seed: number;
  signature: string;
}

export const JOB_ROLES: { value: JobRole; label: string }[] = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'designer', label: 'Designer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'devops', label: 'DevOps' },
  { value: 'ceo', label: 'CEO' },
  { value: 'cto', label: 'CTO' },
  { value: 'hr', label: 'HR' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'intern', label: 'Intern' },
  { value: 'consultant', label: 'Consultant' },
];

export const RARITY_CONFIG: Record<Rarity, { label: string; color: string; weight: number }> = {
  common: { label: 'Common', color: 'from-gray-400 to-gray-500', weight: 40 },
  uncommon: { label: 'Uncommon', color: 'from-green-400 to-emerald-500', weight: 30 },
  rare: { label: 'Rare', color: 'from-blue-400 to-indigo-500', weight: 20 },
  epic: { label: 'Epic', color: 'from-purple-400 to-violet-500', weight: 8 },
  legendary: { label: 'Legendary', color: 'from-amber-400 to-orange-500', weight: 2 },
};
