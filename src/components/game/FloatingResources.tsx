import { Droplets, Wind, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceIndicator {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  position: string;
}

const FloatingResources = () => {
  const resources: ResourceIndicator[] = [
    {
      id: 'water',
      icon: <Droplets className="w-4 h-4" />,
      label: 'Water',
      value: 847,
      unit: 'L',
      position: 'top-[25%] left-[8%]',
    },
    {
      id: 'oxygen',
      icon: <Wind className="w-4 h-4" />,
      label: 'O₂',
      value: 92,
      unit: '%',
      position: 'top-[45%] right-[5%]',
    },
    {
      id: 'energy',
      icon: <Zap className="w-4 h-4" />,
      label: 'Energy',
      value: 1.2,
      unit: 'MW',
      position: 'bottom-[30%] left-[10%]',
    },
  ];

  return (
    <>
      {resources.map((resource) => (
        <div
          key={resource.id}
          className={cn(
            "fixed z-30 flex items-center gap-2 px-3 py-1.5 rounded-full",
            "bg-black/40 backdrop-blur-sm border border-primary/30",
            "animate-pulse-glow",
            resource.position
          )}
        >
          <div className="text-primary animate-pulse">
            {resource.icon}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-orbitron text-primary font-bold">
              {resource.value}
            </span>
            <span className="text-[10px] text-muted-foreground font-exo">
              {resource.unit}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default FloatingResources;
