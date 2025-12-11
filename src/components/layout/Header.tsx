import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-white.png';

export function Header() {
  return (
    <header className="h-20 sm:h-24 bg-primary px-4 sm:px-6 flex items-center justify-between shadow-xl rounded-b-2xl sm:rounded-b-3xl">
      <div className="flex items-center">
        <img src={logo} alt="Smart Parking Line" className="h-16 sm:h-20" />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
          <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-foreground rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
          <User className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </header>
  );
}
