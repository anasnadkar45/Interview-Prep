
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full py-6 px-8 flex justify-between items-center glass-morphism sticky top-0 z-50",
      className
    )}>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-medium tracking-tight">Frontend Challenges</h1>
        <p className="text-sm text-muted-foreground">Practical problems for interview preparation</p>
      </div>
      <nav className="flex items-center gap-8">
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Home
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Resources
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
