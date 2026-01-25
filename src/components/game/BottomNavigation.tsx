import { Home, Sprout, Package, Globe, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onInventoryToggle: () => void;
  onWorldMapToggle: () => void;
}

const BottomNavigation = ({ 
  activeTab, 
  onTabChange, 
  onInventoryToggle,
  onWorldMapToggle 
}: BottomNavigationProps) => {
  const navItems: NavItem[] = [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { id: 'farm', icon: <Sprout className="w-5 h-5" />, label: 'Farm' },
    { id: 'inventory', icon: <Package className="w-5 h-5" />, label: 'Items' },
    { id: 'world', icon: <Globe className="w-5 h-5" />, label: 'World' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const handleClick = (id: string) => {
    if (id === 'inventory') {
      onInventoryToggle();
    } else if (id === 'world') {
      onWorldMapToggle();
    } else {
      onTabChange(id);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2">
      <div className="glass-panel rounded-2xl p-2 mx-auto max-w-md">
        <div className="flex items-center justify-around">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                activeTab === item.id
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              )}
            >
              <div className={cn(
                "transition-all duration-200",
                activeTab === item.id && "drop-shadow-[0_0_8px_hsl(var(--primary))]"
              )}>
                {item.icon}
              </div>
              <span className="text-[10px] font-exo font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
