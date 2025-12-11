import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-white.png';

export function Header() {
  return (
    <header className="h-20 bg-primary px-6 flex items-center justify-between shadow-lg rounded-b-2xl">
      <div className="flex items-center">
        <img src={logo} alt="Smart Parking Line" className="h-14" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-foreground rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
