import { Globe2 } from 'lucide-react';

const GameTitle = () => {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Globe2 className="w-8 h-8 text-primary animate-pulse-glow" />
        <h1 className="font-orbitron text-3xl md:text-4xl font-black tracking-wider text-foreground">
          <span className="text-primary text-glow-primary">VERDANT</span>
          <span className="text-foreground ml-2">GLOBE</span>
        </h1>
        <Globe2 className="w-8 h-8 text-primary animate-pulse-glow" />
      </div>
      <p className="font-exo text-muted-foreground text-sm md:text-base tracking-widest uppercase">
        Farm the World
      </p>
    </div>
  );
};

export default GameTitle;
