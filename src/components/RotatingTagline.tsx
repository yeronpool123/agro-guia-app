import React, { useState, useEffect } from 'react';

interface RotatingTaglineProps {
  className?: string;
  intervalMs?: number;
}

export const RotatingTagline: React.FC<RotatingTaglineProps> = ({
  className = '',
  intervalMs = 2100 // Ritmo dinámico, fluido y perfectamente legible
}) => {
  // Frases de exactamente 3 palabras, métrica uniforme y balance agronómico
  const taglines = [
    { text: 'Cosecha con éxito.' },
    { text: 'Produce con calidad.' },
    { text: 'Prospera con certeza.' },
    { text: 'Siembra con futuro.' },
    { text: 'Avanza con ciencia.' },
    { text: 'Crece con orgullo.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      // 1. Fase de salida hacia la derecha
      setPhase('exiting');

      setTimeout(() => {
        // 2. Cambia al siguiente lema y lo posiciona a la izquierda
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setPhase('entering');

        // 3. Fase de entrada de izquierda al centro
        requestAnimationFrame(() => {
          setTimeout(() => {
            setPhase('idle');
          }, 30);
        });
      }, 300);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, isPaused, taglines.length]);

  const current = taglines[currentIndex];

  // Efecto continuo de Izquierda a Derecha (L -> R) con distancias escaladas para móviles
  const getTransformClasses = () => {
    if (phase === 'exiting') {
      return 'translate-x-6 sm:translate-x-10 opacity-0 transition-all duration-300 ease-in';
    }
    if (phase === 'entering') {
      return '-translate-x-6 sm:-translate-x-10 opacity-0';
    }
    return 'translate-x-0 opacity-100 transition-all duration-350 ease-out';
  };

  return (
    <span
      className={`block sm:inline-block relative overflow-hidden align-bottom max-w-full pb-3 sm:pb-4 pt-1 px-1 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live="polite"
    >
      <span
        key={currentIndex}
        className={`inline-block whitespace-nowrap max-w-full transform will-change-transform leading-normal sm:leading-tight ${getTransformClasses()}`}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E3F] via-[#2E8B57] to-[#15803D] drop-shadow-xs">
          {current.text}
        </span>
      </span>
    </span>
  );
};

