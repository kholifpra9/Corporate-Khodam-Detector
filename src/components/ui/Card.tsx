import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow';
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  const base = 'rounded-2xl border shadow-sm';

  const variants = {
    default: 'bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700',
    glow: 'bg-white border-indigo-200 shadow-lg shadow-indigo-500/10 dark:bg-gray-900 dark:border-indigo-800',
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
