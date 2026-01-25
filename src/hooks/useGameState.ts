import { useState, useCallback } from 'react';
import { Region, REGIONS, TRAVEL_COST } from '@/types/game';
import { toast } from 'sonner';

export const useGameState = () => {
  const [cash, setCash] = useState(400000);
  const [stars, setStars] = useState(100);
  const [currentRegion, setCurrentRegion] = useState<Region>('africa');

  const travelToRegion = useCallback((region: Region) => {
    if (region === currentRegion) {
      toast.info(`You're already in ${REGIONS[region].displayName}`);
      return;
    }

    if (cash < TRAVEL_COST) {
      toast.error(`Need $${TRAVEL_COST.toLocaleString()} to travel!`);
      return;
    }

    setCash(prev => prev - TRAVEL_COST);
    setCurrentRegion(region);
    const regionData = REGIONS[region];
    toast.success(
      `✈️ Traveled to ${regionData.displayName}! Cost: $${TRAVEL_COST.toLocaleString()}`,
      {
        description: `Soil: ${regionData.soilType} (pH ${regionData.phRange.min} - ${regionData.phRange.max})`,
      }
    );
  }, [cash, currentRegion]);

  const handlePlant = useCallback(() => {
    if (cash >= 1000) {
      setCash(prev => prev - 1000);
      const regionData = REGIONS[currentRegion];
      toast.success(`🌱 Seeds planted in ${regionData.displayName}!`, {
        description: `Best crops here: ${regionData.bestCrops.join(', ')}`,
      });
    } else {
      toast.error('Not enough cash to plant!');
    }
  }, [cash, currentRegion]);

  const handleHarvest = useCallback(() => {
    const earnings = Math.floor(Math.random() * 5000) + 2000;
    setCash(prev => prev + earnings);
    toast.success(`🌾 Harvested crops! Earned $${earnings.toLocaleString()}`);
  }, []);

  const handleUpgrade = useCallback(() => {
    if (cash >= 10000) {
      setCash(prev => prev - 10000);
      toast.success('🚀 Farm upgraded! Increased production efficiency!');
    } else {
      toast.error('Need $10,000 to upgrade!');
    }
  }, [cash]);

  const handleBoost = useCallback(() => {
    if (stars >= 10) {
      setStars(prev => prev - 10);
      const bonus = Math.floor(Math.random() * 10000) + 5000;
      setCash(prev => prev + bonus);
      toast.success(`⚡ Star boost activated! Bonus: $${bonus.toLocaleString()}`);
    } else {
      toast.error('Need 10 stars to boost!');
    }
  }, [stars]);

  return {
    cash,
    stars,
    currentRegion,
    currentRegionData: REGIONS[currentRegion],
    travelToRegion,
    handlePlant,
    handleHarvest,
    handleUpgrade,
    handleBoost,
  };
};
