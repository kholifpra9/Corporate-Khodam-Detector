'use client';

import { forwardRef, useState, useCallback } from 'react';
import type { GeneratorResult } from '@/types';
import { JOB_ROLES } from '@/types';
import { RarityBadge } from './RarityBadge';

interface KhodamCardProps {
  result: GeneratorResult;
}

export const KhodamCard = forwardRef<HTMLDivElement, KhodamCardProps>(
  function KhodamCard({ result }, ref) {
    const { name, role, khodam, signature } = result;
    const { primary, secondary, accent } = khodam.colorScheme;
    const [copied, setCopied] = useState(false);

    const roleLabel = JOB_ROLES.find((r) => r.value === role)?.label ?? role;

    const handleCopySignature = useCallback(() => {
      navigator.clipboard.writeText(signature).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }, [signature]);

    const glowColor = khodam.rarity === 'legendary'
      ? `${primary}60`
      : khodam.rarity === 'epic'
        ? `${primary}40`
        : `${primary}20`;

    return (
      <div
        ref={ref}
        className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border bg-white animate-reveal"
        style={{
          borderColor: secondary,
          boxShadow: `0 8px 32px ${primary}20, 0 0 60px ${glowColor}`,
        }}
      >
        <div
          className="px-6 pt-6 pb-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${primary}15, ${accent}30)`,
          }}
        >
          <span className="text-6xl block mb-3 animate-bounce-in">{khodam.emoji}</span>
          <p className="text-xs text-gray-400 mb-1">
            {name} &middot; {roleLabel}
          </p>
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
            {khodam.attributes.map((attr, i) => (
              <div key={attr.name} className="space-y-1" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">{attr.name}</span>
                  <span className="font-mono font-medium text-gray-800">{attr.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
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

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleCopySignature}
              className="text-[10px] font-mono text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
              title="Copy signature"
            >
              #{signature}
            </button>
            {copied && (
              <span className="text-[10px] text-green-500 animate-fade-in">
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);
