import { Star, Settings, Trophy, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  cash: number;
  stars: number;
  onSettingsClick?: () => void;
  onFinanceClick?: () => void;
  className?: string;
}

const TopBar = ({ cash, stars, onSettingsClick, onFinanceClick, className }: TopBarProps) => {
  const formatCash = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toLocaleString();
  };

  return (
    <div className={cn('fixed left-0 right-0 z-50', className ?? 'top-0')}>
      {/* Main Top Bar */}
      <div className="glass-panel border-b border-primary/20 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Currency Section */}
          <div className="flex items-center gap-4">
            {/* Cash – opens Finance modal */}
            <button
              type="button"
              onClick={onFinanceClick}
              className="flex items-center gap-2 glass-panel rounded-full px-3 py-1.5 hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary drop-shadow-[0_0_4px_hsl(var(--primary))]" />
              </div>
              <span className="font-orbitron font-bold text-primary text-sm">
                {formatCash(cash)}
              </span>
            </button>

            {/* Stars */}
            <div className="flex items-center gap-2 glass-panel rounded-full px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center">
                <Star className="w-4 h-4 text-accent fill-accent drop-shadow-[0_0_4px_hsl(var(--glow-accent))]" />
              </div>
              <span className="font-orbitron font-bold text-accent text-sm">
                {stars.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Users className="w-4 h-4 text-primary" />
            </button>
            <button className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-accent/20 transition-colors">
              <Trophy className="w-4 h-4 text-accent" />
            </button>
            <button 
              onClick={onSettingsClick}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
