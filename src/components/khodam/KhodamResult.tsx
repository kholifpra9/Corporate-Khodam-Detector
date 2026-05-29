'use client';

import { useRef, useCallback } from 'react';
import type { GeneratorResult } from '@/types';
import { KhodamCard } from './KhodamCard';
import { DownloadButton } from './DownloadButton';
import { Particles } from './Particles';
import { Button } from '@/components/ui/Button';

interface KhodamResultProps {
  result: GeneratorResult;
  onReset: () => void;
}

export function KhodamResult({ result, onReset }: KhodamResultProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleShare = useCallback(async () => {
    const text = `🔮 Khodam Korporatku: ${result.khodam.name} (${result.khodam.rarity})\n"${result.khodam.title}"\n#${result.signature}\n\nCek khodammu di Corporate Khodam Detector!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Corporate Khodam Detector', text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert('Hasil telah disalin ke clipboard!');
    }
  }, [result]);

  return (
    <div className="relative space-y-6 animate-fade-in">
      <Particles rarity={result.khodam.rarity} />

      <div className="relative text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Khodammu telah ditemukan!
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Berikut adalah khodam korporat yang bersemayam dalam dirimu.
        </p>
      </div>

      <KhodamCard ref={cardRef} result={result} />

      <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
        <DownloadButton cardRef={cardRef} fileName={`khodam-${result.signature}`} />
        <Button variant="secondary" onClick={handleShare}>
          Bagikan
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Cari Khodam Lain
        </Button>
      </div>
    </div>
  );
}
