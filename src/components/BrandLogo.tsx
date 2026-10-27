import React from 'react';

interface BrandLogoProps {
  variant?: 'navbar' | 'icon' | 'badge' | 'footer';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
  showText = true,
  size = 'md'
}) => {
  const isDark = variant === 'badge';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Isotipo de la 'G' con brote de hoja verde lima fiel a Branding@2x.png */}
      <div
        className={`${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl transition-transform hover:scale-105 ${
          isDark
            ? 'bg-[#0F3D2E] text-white shadow-md shadow-[#0F3D2E]/20'
            : 'bg-transparent text-[#0F3D2E]'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Fondo redondeado si es variante badge / sello oscuro */}
          {isDark ? (
            <rect width="100" height="100" rx="24" fill="#0F3D2E" />
          ) : (
            <rect width="100" height="100" rx="24" fill="#E8F4EC" fillOpacity="0.6" />
          )}

          {/* Letra 'G' institucional nítida: trazo circular con barra horizontal interior inconfundible */}
          <path
            d="M 72 30
               C 66 22, 58 18, 48 18
               C 30 18, 16 32, 16 50
               C 16 68, 30 82, 49 82
               C 66 82, 79 72, 82 54
               L 82 46
               L 48 46
               L 48 58
               L 69 58
               C 67 65, 59 70, 49 70
               C 37 70, 28 61, 28 50
               C 28 39, 37 30, 48 30
               C 56 30, 63 33, 68 39
               L 77 30
               C 75 28, 73 27, 72 30
               Z"
            fill={isDark ? '#FFFFFF' : '#0F3D2E'}
          />

          {/* Brote de hoja en verde lima (#C5E063) emergiendo en la apertura superior derecha */}
          <path
            d="M 66 28
               C 66 16, 75 8, 88 6
               C 90 19, 81 29, 69 31
               C 67 31, 66 30, 66 28
               Z"
            fill="#C5E063"
          />
          <path
            d="M 64 34
               C 63 26, 68 20, 77 19
               C 78 26, 73 32, 66 34
               Z"
            fill="#2E8B57"
            opacity="0.85"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-black tracking-tight whitespace-nowrap ${textSizes[size]} ${
            variant === 'footer' ? 'text-white' : 'text-[#0F3D2E]'
          }`}
        >
          Agro<span className="text-[#2E8B57]">Guía</span>
        </span>
      )}
    </div>
  );
};
