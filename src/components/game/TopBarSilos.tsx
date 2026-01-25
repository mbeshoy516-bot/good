import { Warehouse } from 'lucide-react';
import type { CropSilo } from './TradingRoom';

/* Fixed gold yellow – high contrast on glassy green */
const GOLD_YELLOW = '#E8C547';
const GOLD_SHADOW = '0 0 1px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)';

export const SAMPLE_SILOS: CropSilo[] = [
  { id: '1', label: 'Wheat', value: 1240 },
  { id: '2', label: 'Corn', value: 892 },
  { id: '3', label: 'Soy', value: 2103 },
  { id: '4', label: 'Barley', value: 456 },
  { id: '5', label: 'Oats', value: 718 },
];

interface TopBarSilosProps {
  onSiloClick?: (silo: CropSilo) => void;
}

const TopBarSilos = ({ onSiloClick }: TopBarSilosProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 glassy-green-bar">
      <div className="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-3 min-w-0">
        {SAMPLE_SILOS.map((silo) => (
          <button
            type="button"
            key={silo.id}
            onClick={() => onSiloClick?.(silo)}
            className="flex items-center gap-2 flex-shrink-0 silo-pill cursor-pointer hover:bg-black/30 transition-colors text-left"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-black/25"
              aria-hidden
            >
              <Warehouse
                className="w-5 h-5"
                style={{ color: GOLD_YELLOW, filter: `drop-shadow(${GOLD_SHADOW})` }}
              />
            </div>
            <span
              className="text-base font-orbitron font-bold tabular-nums"
              style={{
                color: GOLD_YELLOW,
                textShadow: GOLD_SHADOW,
              }}
            >
              {silo.value.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBarSilos;
