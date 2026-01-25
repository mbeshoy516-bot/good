import { DollarSign, Star } from 'lucide-react';

interface CurrencyDisplayProps {
  cash: number;
  stars: number;
}

const CurrencyDisplay = ({ cash, stars }: CurrencyDisplayProps) => {
  const formatCash = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-3">
      {/* Cash Display */}
      <div className="glass-panel glow-primary rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-exo uppercase tracking-wider">Balance</span>
          <span className="text-lg font-orbitron font-bold text-primary text-glow-primary">
            {formatCash(cash)}
          </span>
        </div>
      </div>

      {/* Stars Display */}
      <div className="glass-panel glow-accent rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
          <Star className="w-5 h-5 text-accent fill-accent drop-shadow-[0_0_8px_hsl(var(--glow-accent))]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-exo uppercase tracking-wider">Stars</span>
          <span className="text-lg font-orbitron font-bold text-accent text-glow-accent">
            {stars}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDisplay;
