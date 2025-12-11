import { NavLink } from '@/components/NavLink';
import { Map, FileWarning, User } from 'lucide-react';

const navItems = [
  { to: '/driver', icon: Map, label: 'الخريطة' },
  { to: '/driver/violations', icon: FileWarning, label: 'مخالفاتي' },
  { to: '/driver/profile', icon: User, label: 'حسابي' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card shadow-xl z-50 rounded-t-2xl border-t border-border">
      <div className="flex items-center justify-around h-16 sm:h-18">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/driver'}
            className="flex flex-col items-center justify-center gap-1 py-2 px-4 sm:px-6 text-muted-foreground transition-all duration-200 hover:scale-105"
            activeClassName="text-primary font-semibold"
          >
            <div className="p-2 rounded-xl transition-colors">
              <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
