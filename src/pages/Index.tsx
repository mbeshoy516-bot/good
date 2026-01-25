import { useState } from 'react';
import GlobeScene from '@/components/game/GlobeScene';
import TopBar from '@/components/game/TopBar';
import TopBarSilos from '@/components/game/TopBarSilos';
import TradingRoom from '@/components/game/TradingRoom';
import type { CropSilo } from '@/components/game/TradingRoom';
import ShootingStars from '@/components/game/ShootingStars';
import SideMenu from '@/components/game/SideMenu';
import BottomNav from '@/components/game/BottomNav';
import FloatingResources from '@/components/game/FloatingResources';
import AmbientSound from '@/components/game/AmbientSound';
import FinanceModal from '@/components/game/FinanceModal';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [financeOpen, setFinanceOpen] = useState(false);
  const [tradingOpen, setTradingOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<CropSilo | null>(null);

  const {
    cash,
    stars,
    currentRegion,
  } = useGameState();

  const handleSiloClick = (silo: CropSilo) => {
    setSelectedCrop(silo);
    setTradingOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Pure black space background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Static Stars Background */}
      <div className="stars-bg" />
      
      {/* Shooting Stars Animation */}
      <ShootingStars />
      
      {/* Floating Resource Indicators */}
      <FloatingResources />
      
      {/* 3D Globe Scene - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <GlobeScene currentRegion={currentRegion} />
      </div>
      
      {/* Top Bar Silos – click opens Trading Room */}
      <TopBarSilos onSiloClick={handleSiloClick} />

      {/* Main Top Bar (currency, etc.) – offset below silo bar */}
      <TopBar
        cash={cash}
        stars={stars}
        onFinanceClick={() => setFinanceOpen(true)}
        className="top-14"
      />

      {/* Finance Modal */}
      <FinanceModal
        open={financeOpen}
        onOpenChange={setFinanceOpen}
        balance={cash}
      />

      {/* Trading Room – full-screen overlay when silo clicked */}
      <TradingRoom
        open={tradingOpen}
        onClose={() => { setTradingOpen(false); setSelectedCrop(null); }}
        crop={selectedCrop}
      />
      
      {/* Side Menu - Auto-hide */}
      <SideMenu />
      
      {/* Ambient Sound Toggle */}
      <AmbientSound />
      
      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;
