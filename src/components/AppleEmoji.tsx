import React, { useState } from 'react';

interface AppleEmojiProps {
  symbol: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  label?: string;
}

const pixelSizes = {
  xs: 'w-4 h-4 text-xs',
  sm: 'w-5 h-5 text-sm',
  md: 'w-7 h-7 text-xl',
  lg: 'w-10 h-10 text-3xl',
  xl: 'w-14 h-14 text-5xl',
  '2xl': 'w-20 h-20 text-6xl',
  hero: 'w-28 h-28 sm:w-36 sm:h-36 text-7xl sm:text-8xl'
};

export const AppleEmoji: React.FC<AppleEmojiProps> = ({
  symbol,
  className = '',
  size = 'md',
  label
}) => {
  const [imgError, setImgError] = useState(false);

  // Normalizar símbolo removiendo selectores de variación que puedan alterar la URL
  const cleanSymbol = symbol.replace(/[\uFE0E\uFE0F]/g, '');
  const appleEmojiUrl = `https://emojicdn.elk.sh/${encodeURIComponent(cleanSymbol)}?style=apple`;

  const sizeClass = pixelSizes[size] || pixelSizes.md;

  if (imgError) {
    // Fallback nativo estilizado si falla la conexión
    return (
      <span
        className={`emoji-apple select-none inline-flex items-center justify-center leading-none ${sizeClass} ${className}`}
        role="img"
        aria-label={label || symbol}
      >
        {symbol}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center select-none shrink-0 align-middle ${className}`}
      role="img"
      aria-label={label || symbol}
    >
      <img
        src={appleEmojiUrl}
        alt={symbol}
        className={`${sizeClass.split(' ')[0]} ${sizeClass.split(' ')[1]} object-contain drop-shadow-xs pointer-events-none transition-transform`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
      />
    </span>
  );
};
