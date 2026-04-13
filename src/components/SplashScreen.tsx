import { useState, useEffect } from 'react';
import lupaImg from '../images/Lupa.png';

export function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'zoom' | 'done'>('idle');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('zoom'), 500); 
    // Como el zoom dura 2.5s, pasamos directo a done justo cuando está terminando.
    // Usamos 2800ms (500 + 2300, un toque antes de que termine al 100%) para que la transición sea pura suavidad
    const t2 = setTimeout(() => {
      setPhase('done');
      onFinished();
    }, 2800); 
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinished]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: '#ffffff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* Lupa con zoom */}
      <img
        src={lupaImg}
        alt="Lupa"
        style={{
          width: 160,
          height: 160,
          objectFit: 'contain',
          transform: phase === 'zoom' ? 'scale(14)' : 'scale(1)',
          opacity: phase === 'zoom' ? 0 : 1,
          // Hacemos que el desvanecimiento de la lupa también sea más lento (1.5s) para que se aprecie bien el zoom
          transition: 'transform 2.5s cubic-bezier(0.22,1,0.36,1), opacity 1.5s ease',
        }}
      />

      {/* Título */}
      <div style={{
        marginTop: 20,
        fontFamily: 'SVQJusta, Georgia, serif',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D6A27',
        letterSpacing: 2,
        textAlign: 'center',
        opacity: phase === 'zoom' ? 0 : 1,
        transform: phase === 'zoom' ? 'translateY(-12px)' : 'translateY(0)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        ¿Quién sabe ande?
      </div>

      {/* Subtítulo */}
      <div style={{
        marginTop: 8,
        fontFamily: 'SVQJusta, Georgia, serif',
        fontSize: 11,
        color: '#DFC48A',
        letterSpacing: 5,
        textTransform: 'uppercase',
        opacity: phase === 'zoom' ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}>
        · Carta Interactiva ·
      </div>

    </div>
  );
}

export function shouldShowSplash(): boolean {
  const STORAGE_KEY = 'splash_last_shown';
  const today = new Date().toDateString();
  const lastShown = localStorage.getItem(STORAGE_KEY);
  if (lastShown === today) return false;
  localStorage.setItem(STORAGE_KEY, today);
  return true;
}
