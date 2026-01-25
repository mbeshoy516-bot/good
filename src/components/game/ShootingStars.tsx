import { useEffect, useState } from 'react';

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  length: number;
}

const ShootingStars = () => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const createStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        startX: 20 + Math.random() * 60, // Start more centered
        startY: Math.random() * 40, // Top portion of screen
        angle: 35 + Math.random() * 20, // 35-55 degrees
        duration: 0.6 + Math.random() * 0.4, // 0.6-1s (faster)
        length: 60 + Math.random() * 40, // Shorter streaks
      };
      
      setStars(prev => [...prev, newStar]);
      
      // Remove star after animation
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== newStar.id));
      }, newStar.duration * 1000 + 100);
    };

    // Create shooting stars at rare intervals (5-12 seconds)
    const scheduleNext = () => {
      const nextDelay = 5000 + Math.random() * 7000;
      return setTimeout(() => {
        createStar();
        scheduleNext();
      }, nextDelay);
    };

    // Initial delay before first star
    const initialTimeout = setTimeout(() => {
      createStar();
      scheduleNext();
    }, 3000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute shooting-star-thin"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            '--angle': `${star.angle}deg`,
            '--duration': `${star.duration}s`,
            '--length': `${star.length}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
