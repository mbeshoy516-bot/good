import { Sprout, Factory, Rocket, Zap } from 'lucide-react';
import FarmCard from './FarmCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameCardsProps {
  onPlant: () => void;
  onHarvest: () => void;
  onUpgrade: () => void;
  onBoost: () => void;
}

const GameCards = ({ onPlant, onHarvest, onUpgrade, onBoost }: GameCardsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 p-4 ${
      isMobile 
        ? 'flex flex-col gap-3 max-h-[60vh] overflow-y-auto pb-8' 
        : 'flex flex-row justify-center gap-4 pb-6'
    }`}>
      {/* Mobile: Stack vertically | Desktop: Row layout */}
      <div className={`${
        isMobile 
          ? 'flex flex-col gap-3 w-full' 
          : 'flex flex-row gap-4 max-w-5xl'
      }`}>
        <FarmCard
          title="Plant Seeds"
          icon={<Sprout className="w-6 h-6 text-primary" />}
          description="Plant new crops on your global farm."
          action="Plant Now"
          onAction={onPlant}
          variant="primary"
        />
        
        <FarmCard
          title="Harvest"
          icon={<Factory className="w-6 h-6 text-secondary" />}
          description="Collect your mature crops for profit."
          action="Harvest All"
          onAction={onHarvest}
          variant="secondary"
        />
        
        <FarmCard
          title="Upgrade"
          icon={<Rocket className="w-6 h-6 text-accent" />}
          description="Enhance your farming technology."
          action="Upgrade Farm"
          onAction={onUpgrade}
          variant="accent"
        />
        
        <FarmCard
          title="Boost"
          icon={<Zap className="w-6 h-6 text-primary" />}
          description="Speed up growth with star power."
          action="Use Stars"
          onAction={onBoost}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default GameCards;
