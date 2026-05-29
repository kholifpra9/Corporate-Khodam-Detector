'use client';

import { useRef } from 'react';
import type { GeneratorResult } from '@/types';
import { KhodamCard } from './KhodamCard';
import { DownloadButton } from './DownloadButton';
import { Button } from '@/components/ui/Button';

interface KhodamResultProps {
  result: GeneratorResult;
  onReset: () => void;
}

export function KhodamResult({ result, onReset }: KhodamResultProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Khodammu telah ditemukan!
        </h2>
        <p className="text-sm text-gray-500 mt-1">
              Berikut adalah khodam korporat yang bersemayam dalam dirimu.
        </p>
      </div>

      <KhodamCard ref={cardRef} result={result} />

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <DownloadButton cardRef={cardRef} fileName={`khodam-${result.signature}`} />
        <Button variant="ghost" onClick={onReset}>
          Cari Khodam Lain
        </Button>
      </div>
    </div>
  );
}
