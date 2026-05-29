'use client';

import { useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  'Memanggil khodam korporat...',
  'Menyusuri lorong meeting tak berujung...',
  'Menembus firewall spiritual...',
  'Menggali database perusahaan astral...',
  'Menghubungi server alam gaib...',
  'Membaca email dari dimensi lain...',
  'Menyeduh kopi energi mistis...',
  'Meng-update status LinkedIn...',
];

const EMOJIS = ['🔮', '✨', '🌀', '⭐', '💫', '🌟', '⚡'];

export function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);

    const emojiInterval = setInterval(() => {
      setEmojiIndex((i) => (i + 1) % EMOJIS.length);
    }, 400);

    return () => {
      clearInterval(msgInterval);
      clearInterval(emojiInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <span className="text-6xl animate-loading-pulse block">{EMOJIS[emojiIndex]}</span>
        <span className="absolute -top-1 -right-1 text-2xl animate-bounce-in">{EMOJIS[(emojiIndex + 3) % EMOJIS.length]}</span>
        <span className="absolute -bottom-1 -left-1 text-xl animate-bounce-in" style={{ animationDelay: '0.3s' }}>{EMOJIS[(emojiIndex + 5) % EMOJIS.length]}</span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400"
            style={{
              animation: `loading-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-500 text-center animate-fade-in">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
