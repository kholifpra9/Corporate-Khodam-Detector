import { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'main' | 'section' | 'div';
}

export function Container({ as: Tag = 'div', className = '', children, ...props }: ContainerProps) {
  return (
    <Tag
      className={`max-w-3xl mx-auto px-4 py-8 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
