'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { KhodamForm } from '@/components/khodam/KhodamForm';
import { KhodamResult } from '@/components/khodam/KhodamResult';
import { KhodamHistory } from '@/components/khodam/KhodamHistory';
import { Card } from '@/components/ui/Card';
import { generateKhodam } from '@/lib/khodam-generator';
import { saveToHistory } from '@/lib/storage';
import type { JobRole, GeneratorResult } from '@/types';

export default function Home() {
  const [result, setResult] = useState<GeneratorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback((name: string, role: JobRole) => {
    setLoading(true);
    const generated = generateKhodam(name, role);
    setResult(generated);
    saveToHistory(generated);
    setLoading(false);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  const handleSelectHistory = useCallback((item: GeneratorResult) => {
    setResult(item);
  }, []);

  return (
    <>
      <Header />
      <Container as="main" className="flex-1">
        {!result ? (
          <>
            <Card className="p-6 md:p-8">
              <div className="text-center mb-6">
                <span className="text-5xl block mb-3">🔮</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Cek Khodam Korporat-mu
                </h2>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                  Masukkan nama dan role pekerjaanmu untuk mengetahui khodam perusahaan
                  apa yang menemanimu di dunia korporat.
                </p>
              </div>
              <KhodamForm onGenerate={handleGenerate} loading={loading} />
            </Card>
            <KhodamHistory onSelect={handleSelectHistory} />
          </>
        ) : (
          <KhodamResult result={result} onReset={handleReset} />
        )}
      </Container>
      <Footer />
    </>
  );
}
