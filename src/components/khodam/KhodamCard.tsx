'use client';

import { forwardRef } from 'react';
import type { GeneratorResult } from '@/types';
import { RarityBadge } from './RarityBadge';

interface KhodamCardProps {
  result: GeneratorResult;
}

export const KhodamCard = forwardRef<HTMLDivElement, KhodamCardProps>(
  function KhodamCard({ result }, ref) {
    const { khodam, signature } = result;
    const { primary, secondary, accent } = khodam.colorScheme;

    return (
      <div
        ref={ref}
        className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border bg-white"
        style={{
          borderColor: secondary,
          boxShadow: `0 8px 32px ${primary}20`,
        }}
      >
        <div
          className="px-6 pt-6 pb-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${primary}15, ${accent}30)`,
          }}
        >
          <span className="text-6xl block mb-3">{khodam.emoji}</span>
          <h2 className="text-2xl font-bold text-gray-900">{khodam.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{khodam.title}</p>
          <div className="mt-3">
            <RarityBadge rarity={khodam.rarity} />
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {khodam.description}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-400">Elemen:</span>
            <span className="font-medium text-gray-700">{khodam.element}</span>
          </div>

          <div className="space-y-2">
            {khodam.attributes.map((attr) => (
              <div key={attr.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">{attr.name}</span>
                  <span className="font-mono font-medium text-gray-800">{attr.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${attr.value}%`,
                      background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 text-center">
            <p className="text-sm italic text-gray-500">&ldquo;{khodam.quote}&rdquo;</p>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-mono text-gray-300">
              #{signature}
            </span>
          </div>
        </div>
      </div>
    );
  },
);
