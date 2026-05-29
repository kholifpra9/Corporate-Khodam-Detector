'use client';

import { useState, useMemo } from 'react';
import type { GeneratorResult } from '@/types';
import { loadHistory, clearHistory, removeFromHistory } from '@/lib/storage';
import { RarityBadge } from './RarityBadge';
import { Button } from '@/components/ui/Button';

interface KhodamHistoryProps {
  onSelect: (result: GeneratorResult) => void;
}

export function KhodamHistory({ onSelect }: KhodamHistoryProps) {
  const [history, setHistory] = useState<GeneratorResult[]>(() => loadHistory());
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return history;
    const q = search.toLowerCase();
    return history.filter(
      (h) =>
        h.khodam.name.toLowerCase().includes(q) ||
        h.signature.toLowerCase().includes(q) ||
        h.khodam.rarity.includes(q),
    );
  }, [history, search]);

  function handleClear() {
    clearHistory();
    setHistory([]);
  }

  function handleRemove(signature: string, e: React.MouseEvent) {
    e.stopPropagation();
    removeFromHistory(signature);
    setHistory((prev) => prev.filter((h) => h.signature !== signature));
  }

  if (history.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Riwayat Pengecekan
        </h3>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Hapus Semua
        </Button>
      </div>

      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Cari riwayat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((item, idx) => (
          <button
            key={item.signature}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors text-left group relative"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <span className="text-2xl">{item.khodam.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.khodam.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                #{item.signature}
              </p>
            </div>
            <RarityBadge rarity={item.khodam.rarity} />
            <button
              onClick={(e) => handleRemove(item.signature, e)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              title="Hapus"
            >
              &times;
            </button>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-4">
            Tidak ada hasil untuk &quot;{search}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
