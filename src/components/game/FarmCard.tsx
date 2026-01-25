import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FarmCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  action: string;
  onAction: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

const FarmCard = ({ 
  title, 
  icon, 
  description, 
  action, 
  onAction, 
  variant = 'primary',
  disabled = false 
}: FarmCardProps) => {
  const glowClass = {
    primary: 'glow-primary',
    secondary: 'glow-secondary',
    accent: 'glow-accent',
  }[variant];

  const buttonVariant = {
    primary: 'bg-primary hover:bg-primary/80 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    accent: 'bg-accent hover:bg-accent/80 text-accent-foreground',
  }[variant];

  return (
    <Card className={`glass-card ${glowClass} border-0 transition-all duration-300 hover:scale-105 w-full`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            variant === 'primary' ? 'bg-primary/20' :
            variant === 'secondary' ? 'bg-secondary/20' : 'bg-accent/20'
          }`}>
            {icon}
          </div>
          <CardTitle className="font-orbitron text-lg text-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground font-exo">{description}</p>
        <Button 
          onClick={onAction}
          disabled={disabled}
          className={`w-full font-orbitron font-semibold transition-all duration-300 ${buttonVariant}`}
        >
          {action}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FarmCard;
