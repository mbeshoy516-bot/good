import { useState } from 'react';
import { Bot, ListTodo, Package, ChevronRight, ChevronLeft, Sprout, Settings2, Warehouse } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
}

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState<string>('inventory');
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Auto-hide after delay when mouse leaves
    setTimeout(() => {
      if (!isHovering) {
        setIsOpen(false);
      }
    }, 500);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems: MenuItem[] = [
    { 
      id: 'clouds', 
      icon: <Sprout className="w-5 h-5" />, 
      label: 'السحاب',
      active: true 
    },
    { 
      id: 'tasks', 
      icon: <ListTodo className="w-5 h-5" />, 
      label: 'Tasks' 
    },
    { 
      id: 'bots', 
      icon: <Bot className="w-5 h-5" />, 
      label: 'Bots' 
    },
    { 
      id: 'bots2', 
      icon: <Bot className="w-5 h-5" />, 
      label: 'Bots' 
    },
    { 
      id: 'bots3', 
      icon: <Bot className="w-5 h-5" />, 
      label: 'Bots' 
    },
    { 
      id: 'harvest', 
      icon: <Settings2 className="w-5 h-5" />, 
      label: 'حصاد' 
    },
  ];

  return (
    <>
      {/* Hover Detection Zone */}
      <div
        className="fixed top-0 left-0 w-4 h-full z-50"
        onMouseEnter={handleMouseEnter}
      />

      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-50 w-6 h-14 glass-panel rounded-r-lg flex items-center justify-center transition-all duration-300",
          "hover:bg-primary/20 border-l-0",
          isOpen ? "left-48" : "left-0"
        )}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-primary" />
        ) : (
          <ChevronRight className="w-4 h-4 text-primary" />
        )}
      </button>

      {/* Sidebar */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "fixed top-16 left-0 h-auto max-h-[70vh] z-40 glass-panel border-r border-primary/20 rounded-r-xl transition-transform duration-300 ease-out overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-3 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            <span className="font-orbitron text-sm font-bold text-foreground">Inventory</span>
          </div>
        </div>

        {/* Quick Access Icons */}
        <div className="p-3 border-b border-primary/20">
          <div className="flex items-center justify-around gap-2">
            <button className="w-10 h-10 rounded-lg glass-panel border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Warehouse className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-lg glass-panel border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Settings2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-lg glass-panel border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Bot className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "w-full px-3 py-2.5 flex items-center gap-3 transition-all duration-200",
                item.active || activeItem === item.id
                  ? "bg-primary/20 border-l-2 border-primary text-primary"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground border-l-2 border-transparent"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                item.active || activeItem === item.id
                  ? "bg-primary/30"
                  : "bg-muted/30"
              )}>
                {item.icon}
              </div>
              <span className="text-sm font-exo">{item.label}</span>
              {(item.active || activeItem === item.id) && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
