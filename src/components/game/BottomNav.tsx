import { Home, Sprout, Truck, Settings, Tractor } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navItems: NavItem[] = [
    { id: 'home', icon: <Home className="w-6 h-6" /> },
    { id: 'tractor', icon: <Tractor className="w-6 h-6" /> },
    { id: 'farm', icon: <Sprout className="w-6 h-6" /> },
    { id: 'truck', icon: <Truck className="w-6 h-6" /> },
    { id: 'settings', icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-panel border-t border-primary/20">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary/70"
              )}
            >
              {/* Glow effect for active item */}
              {activeTab === item.id && (
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
              )}
              
              <div className={cn(
                "relative z-10 transition-all duration-300",
                activeTab === item.id && "drop-shadow-[0_0_10px_hsl(var(--primary))]"
              )}>
                {item.icon}
              </div>
              
              {/* Active indicator dot */}
              {activeTab === item.id && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
