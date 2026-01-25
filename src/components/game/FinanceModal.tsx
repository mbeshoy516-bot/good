import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/* Farm-themed colors */
const MINT_GREEN = 'hsl(158, 65%, 58%)';   /* positive */
const SOFT_RED = 'hsl(0, 55%, 68%)';       /* negative */
const CLEAN_WHITE = '#ffffff';

export interface Transaction {
  id: string;
  description: string;
  amount: number;  /* positive = income, negative = expense */
  date: string;
}

interface FinanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  transactions?: Transaction[];
}

const formatCurrency = (amount: number) => {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
};

const defaultTransactions: Transaction[] = [
  { id: '1', description: 'Harvest earnings', amount: 3200, date: 'Today' },
  { id: '2', description: 'Seeds planted', amount: -1000, date: 'Today' },
  { id: '3', description: 'Travel to Europe', amount: -5000, date: 'Yesterday' },
  { id: '4', description: 'Star boost bonus', amount: 7500, date: 'Yesterday' },
  { id: '5', description: 'Farm upgrade', amount: -10000, date: '2 days ago' },
];

const FinanceModal = ({
  open,
  onOpenChange,
  balance,
  transactions = defaultTransactions,
}: FinanceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'finance-modal-bg border border-[hsl(150,40%,35%)] text-white max-w-md p-0 gap-0 overflow-hidden',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          '[&_button.absolute.right-4.top-4]:text-white [&_button.absolute.right-4.top-4]:hover:bg-white/10 [&_button.absolute.right-4.top-4]:rounded-md'
        )}
      >
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold font-orbitron tracking-tight text-white">
            Finance
          </DialogTitle>
        </DialogHeader>

        {/* Balance box – centered, dark, thin border, large white font */}
        <div className="px-6 pb-4 flex justify-center">
          <div className="finance-modal-balance-box w-full max-w-[280px] rounded-xl px-5 py-4 flex flex-col items-center justify-center">
            <span className="text-xs font-exo uppercase tracking-wider text-white/80 mb-1">
              Balance
            </span>
            <span
              className="text-2xl font-orbitron font-bold"
              style={{ color: CLEAN_WHITE }}
            >
              {formatCurrency(balance)}
            </span>
          </div>
        </div>

        {/* Transaction list */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-exo font-semibold uppercase tracking-wider text-white mb-3">
            Recent transactions
          </h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/20 border border-white/5"
              >
                <div>
                  <p className="text-sm font-medium text-white">{tx.description}</p>
                  <p className="text-xs text-white/60">{tx.date}</p>
                </div>
                <span
                  className="text-sm font-orbitron font-semibold tabular-nums"
                  style={{
                    color: tx.amount >= 0 ? MINT_GREEN : SOFT_RED,
                  }}
                >
                  {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinanceModal;
