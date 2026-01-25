import { useState } from 'react';
import { Package, ChevronLeft, ChevronRight, Lock, Sprout, Wheat, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventorySlot {
  id: number;
  locked: boolean;
  crop?: string;
  growth?: number;
}

interface InventorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const InventorySidebar = ({ isOpen, onToggle }: InventorySidebarProps) => {
  const [slots] = useState<InventorySlot[]>([
    { id: 1, locked: false, crop: 'Coffee', growth: 75 },
    { id: 2, locked: false },
    { id: 3, locked: false },
    { id: 4, locked: true },
    { id: 5, locked: true },
    { id: 6, locked: true },
  ]);

  const getCropIcon = (crop?: string) => {
    switch (crop) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-primary" />;
      case 'Wheat':
        return <Wheat className="w-5 h-5 text-accent" />;
      default:
        return <Sprout className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-50 w-8 h-16 glass-panel rounded-r-lg flex items-center justify-center transition-all duration-300",
          "hover:bg-primary/20 border-l-0",
          isOpen ? "left-64" : "left-0"
        )}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-primary" />
        ) : (
          <ChevronRight className="w-5 h-5 text-primary" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-40 glass-panel border-r border-primary/20 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-foreground">Inventory</h2>
              <p className="text-xs text-muted-foreground font-exo">Land Slots</p>
            </div>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {slots.map(slot => (
              <div
                key={slot.id}
                className={cn(
                  "aspect-square rounded-lg border transition-all duration-200",
                  slot.locked
                    ? "bg-muted/30 border-muted/40 cursor-not-allowed"
                    : "glass-panel border-primary/30 hover:border-primary/60 cursor-pointer hover:glow-primary"
                )}
              >
                {slot.locked ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                    <Lock className="w-5 h-5 text-muted-foreground/60" />
                    <span className="text-[10px] text-muted-foreground/60 font-exo">$50K</span>
                  </div>
                ) : slot.crop ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
                    {getCropIcon(slot.crop)}
                    <span className="text-[10px] text-foreground font-exo">{slot.crop}</span>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${slot.growth}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/20">
          <div className="flex justify-between text-xs font-exo">
            <span className="text-muted-foreground">Active Slots</span>
            <span className="text-primary font-bold">3/6</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventorySidebar;
