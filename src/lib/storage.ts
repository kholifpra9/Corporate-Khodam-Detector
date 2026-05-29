'use client';

import type { GeneratorResult } from '@/types';

const STORAGE_KEY = 'khodam-history';
const MAX_ITEMS = 10;

export function loadHistory(): GeneratorResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(result: GeneratorResult): void {
  const history = loadHistory();
  const exists = history.some((h) => h.signature === result.signature);
  if (!exists) {
    history.unshift(result);
    if (history.length > MAX_ITEMS) history.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function removeFromHistory(signature: string): void {
  const history = loadHistory();
  const filtered = history.filter((h) => h.signature !== signature);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
