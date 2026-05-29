'use client';

import { useState, useEffect } from 'react';
import type { GeneratorResult } from '@/types';
import { loadHistory, clearHistory } from '@/lib/storage';
import { RarityBadge } from './RarityBadge';
import { Button } from '@/components/ui/Button';

interface KhodamHistoryProps {
  onSelect: (result: GeneratorResult) => void;
}

export function KhodamHistory({ onSelect }: KhodamHistoryProps) {
  const [history, setHistory] = useState<GeneratorResult[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  if (history.length === 0) return null;

  function handleClear() {
    clearHistory();
    setHistory([]);
  }

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
      <div className="space-y-2">
        {history.map((item) => (
          <button
            key={item.signature}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors text-left"
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
          </button>
        ))}
      </div>
    </div>
  );
}
