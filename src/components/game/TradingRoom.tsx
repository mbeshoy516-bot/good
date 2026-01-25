import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

export interface CropSilo {
  id: string;
  label: string;
  value: number;
}

const GOLD_YELLOW = '#FFD700';
const LIGHT_GREEN = '#86efac';
const ORANGE = '#fb923c';
const VIBRANT_BLUE = '#3b82f6';
const DARK_GREEN = '#166534';
const PRICE_POINTER = '#d1d5db';

/* Mock price history (last 14 points) */
const generatePriceHistory = (base = 42.5) => {
  const out: { time: string; price: number; vol: number }[] = [];
  let p = base;
  for (let i = 0; i < 14; i++) {
    p += (Math.random() - 0.48) * 2;
    p = Math.max(38, Math.min(48, p));
    out.push({ time: String(i), price: Number(p.toFixed(2)), vol: Math.floor(Math.random() * 400) + 100 });
  }
  return out;
};

/* Mock live trades */
const LIVE_TRADES = [
  { id: '1', side: 'sell', qty: 120, price: 42.8, time: '10:32:01' },
  { id: '2', side: 'buy', qty: 80, price: 42.6, time: '10:31:58' },
  { id: '3', side: 'sell', qty: 200, price: 42.7, time: '10:31:55' },
  { id: '4', side: 'buy', qty: 50, price: 42.5, time: '10:31:52' },
  { id: '5', side: 'sell', qty: 90, price: 42.9, time: '10:31:48' },
  { id: '6', side: 'buy', qty: 150, price: 42.4, time: '10:31:44' },
];

interface TradingRoomProps {
  open: boolean;
  onClose: () => void;
  crop: CropSilo | null;
}

const TradingRoom = ({ open, onClose, crop }: TradingRoomProps) => {
  const stock = crop?.value ?? 0;
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(42.5);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);
  const [chartData, setChartData] = useState(() => generatePriceHistory(42.5));

  useEffect(() => {
    if (!open || !crop) return;
    setAmount(0);
    setPrice(42.5);
    setPriceDirection(null);
    setChartData(generatePriceHistory(42.5));
  }, [open, crop?.id]);

  /* Simulate price updates and flicker */
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => {
      setPrice((prev) => {
        const change = (Math.random() - 0.5) * 1.2;
        const next = Math.max(38, Math.min(48, prev + change));
        setPriceDirection(change > 0 ? 'up' : change < 0 ? 'down' : null);
        setChartData((d) => {
          const tail = d.slice(1);
          const last = tail[tail.length - 1];
          const nextIdx = last ? Number(last.time) + 1 : 0;
          return [
            ...tail,
            {
              time: String(nextIdx),
              price: Number(next.toFixed(2)),
              vol: Math.floor(Math.random() * 400) + 100,
            },
          ];
        });
        return Number(next.toFixed(2));
      });
    }, 800);
    return () => clearInterval(t);
  }, [open]);

  /* Clear flicker after short delay */
  useEffect(() => {
    if (priceDirection === null) return;
    const id = setTimeout(() => setPriceDirection(null), 400);
    return () => clearTimeout(id);
  }, [priceDirection]);

  const handleSellAll = () => setAmount(stock);
  const handleSellSelected = () => {
    /* Placeholder: could trigger actual sell */
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-lg trading-room-panel flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* 1. Warning Box – top, glassy white, hazard stripes */}
      <div className="warning-box-hazard-outer shrink-0 mx-4 mt-4 p-[3px] rounded-lg">
        <div className="warning-box-hazard-inner rounded-md px-4 py-3">
          <p className="text-center font-bold text-black text-base" dir="rtl">
            تنبيه: البيع على مسؤوليتك الشخصية
          </p>
        </div>
      </div>

      {/* 2. Data & Price + Controls – center */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="trading-room-panel rounded-xl p-4 space-y-4 max-w-lg mx-auto">
          {crop && (
            <p className="text-sm font-semibold text-white/90">
              Trading: <span style={{ color: GOLD_YELLOW }}>{crop.label}</span>
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Crop Stock</p>
              <p className="text-xl font-orbitron font-bold" style={{ color: GOLD_YELLOW }}>
                {stock.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Amount to Sell</p>
              <p className="text-xl font-orbitron font-bold" style={{ color: GOLD_YELLOW }}>
                {amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-baseline justify-center gap-2">
            <span
              className={cn(
                'text-3xl font-orbitron font-bold tabular-nums transition-colors duration-300',
                priceDirection === 'up' && 'price-flicker-up',
                priceDirection === 'down' && 'price-flicker-down',
              )}
              style={
                priceDirection === 'up'
                  ? { color: LIGHT_GREEN }
                  : priceDirection === 'down'
                    ? { color: ORANGE }
                    : { color: '#e5e7eb' }
              }
            >
              {price.toFixed(2)}
            </span>
            <span className="text-lg font-orbitron text-white/80" style={{ color: PRICE_POINTER }}>
              ↑
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-white/70">Quantity</p>
            <Slider
              value={[amount]}
              onValueChange={([v]) => setAmount(Math.min(stock, Math.max(0, v)))}
              max={Math.max(1, stock)}
              step={1}
              className="trading-slider"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSellAll}
              className="flex-1 h-12 font-orbitron bg-[#ea580c] hover:bg-[#c2410c] text-white border-0"
            >
              Sell All
            </Button>
            <Button
              onClick={handleSellSelected}
              className="flex-1 h-12 font-orbitron text-white border-0"
              style={{ backgroundColor: DARK_GREEN }}
            >
              Sell Selected
            </Button>
          </div>
        </div>

        {/* 3. Charts */}
        <div className="trading-room-panel rounded-xl p-4 space-y-4">
          <p className="text-sm font-semibold text-white/90">Price</p>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(152 30% 12% / 0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#d1d5db' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={VIBRANT_BLUE}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm font-semibold text-white/90">Volume</p>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Bar dataKey="vol" fill="#22c55e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm font-semibold text-white/90">Live Trades</p>
          <ScrollArea className="h-28 rounded-lg border border-white/10">
            <div className="pr-3 space-y-1">
              {LIVE_TRADES.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between text-xs py-1.5 border-b border-white/5 last:border-0"
                >
                  <span className={t.side === 'buy' ? 'text-[#86efac]' : 'text-[#fb923c]'}>
                    {t.side.toUpperCase()}
                  </span>
                  <span className="text-white/80 tabular-nums">{t.qty}</span>
                  <span className="font-orbitron" style={{ color: GOLD_YELLOW }}>
                    {t.price.toFixed(2)}
                  </span>
                  <span className="text-white/50">{t.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TradingRoom;
