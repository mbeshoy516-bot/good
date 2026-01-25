import { RegionData } from '@/types/game';
import { Leaf, Droplets } from 'lucide-react';

interface RegionInfoProps {
  regionData: RegionData;
}

const RegionInfo = ({ regionData }: RegionInfoProps) => {
  return (
    <div className="fixed top-24 right-4 z-30 glass-card p-3 rounded-xl max-w-[180px]">
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: regionData.color }}
        />
        <span className="text-sm font-orbitron text-primary">
          {regionData.displayName}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Droplets className="w-3 h-3 text-blue-400" />
          <div>
            <p className="text-[10px] text-muted-foreground">Soil pH</p>
            <p className="text-xs font-semibold text-foreground">
              {regionData.phRange.min} - {regionData.phRange.max}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Leaf className="w-3 h-3 text-green-400" />
          <div>
            <p className="text-[10px] text-muted-foreground">Best Crops</p>
            <p className="text-xs font-semibold text-foreground">
              {regionData.bestCrops.join(', ')}
            </p>
          </div>
        </div>
        
        <div className="pt-1 border-t border-white/10">
          <p className="text-[10px] text-muted-foreground">
            {regionData.soilType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegionInfo;
