'use client';

import { useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/Button';

interface DownloadButtonProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export function DownloadButton({ cardRef, fileName = 'khodam-card' }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;

    setLoading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      console.error('Failed to download card');
    } finally {
      setLoading(false);
    }
  }, [cardRef, fileName]);

  return (
    <Button onClick={handleDownload} disabled={loading} variant="secondary" size="md">
      {loading ? 'Memproses...' : 'Download Kartu PNG'}
    </Button>
  );
}
