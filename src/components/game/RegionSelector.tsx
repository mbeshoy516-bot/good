import { Region, REGIONS, TRAVEL_COST } from '@/types/game';
import { Globe, Plane } from 'lucide-react';

interface RegionSelectorProps {
  currentRegion: Region;
  onSelectRegion: (region: Region) => void;
  cash: number;
}

const RegionSelector = ({ currentRegion, onSelectRegion, cash }: RegionSelectorProps) => {
  const regions: Region[] = ['africa', 'europe', 'americas'];

  return (
    <div className="fixed top-24 left-4 z-30 glass-card p-3 rounded-xl">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Globe className="w-4 h-4" />
        <span className="text-xs font-orbitron uppercase tracking-wider">World Map</span>
      </div>
      
      <div className="flex flex-col gap-2">
        {regions.map((region) => {
          const data = REGIONS[region];
          const isActive = region === currentRegion;
          const canAfford = cash >= TRAVEL_COST || isActive;

          return (
            <button
              key={region}
              onClick={() => onSelectRegion(region)}
              disabled={!canAfford}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all
                ${isActive 
                  ? 'bg-primary/30 border border-primary glow-primary' 
                  : canAfford 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                    : 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
                }
              `}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: data.color }}
              />
              <div className="flex-1">
                <div className="text-xs font-semibold text-foreground">
                  {data.displayName}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  pH {data.phRange.min} - {data.phRange.max}
                </div>
              </div>
              {!isActive && (
                <Plane className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-2 pt-2 border-t border-white/10">
        <p className="text-[10px] text-muted-foreground text-center">
          Travel cost: ${TRAVEL_COST.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RegionSelector;
