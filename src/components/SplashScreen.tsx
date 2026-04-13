import { useState, useEffect } from 'react';
import splashImg from '../images/splash_screen.png';

export function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'zoom' | 'done'>('idle');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('zoom'), 500); 
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
      <img
        src={splashImg}
        alt="Splash Screen"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: phase === 'zoom' ? 'scale(3)' : 'scale(1)',
          opacity: phase === 'zoom' ? 0 : 1,
          transition: 'transform 2.5s cubic-bezier(0.22,1,0.36,1), opacity 1.5s ease',
        }}
      />
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
