import { NavLink } from '@/components/NavLink';
import { Map, FileWarning, User } from 'lucide-react';

const navItems = [
  { to: '/driver', icon: Map, label: 'الخريطة' },
  { to: '/driver/violations', icon: FileWarning, label: 'مخالفاتي' },
  { to: '/driver/profile', icon: User, label: 'حسابي' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/driver'}
            className="flex flex-col items-center justify-center gap-1 py-2 px-4 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
