import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, AlertTriangle, Map, Settings, FileText } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { to: '/violations', icon: AlertTriangle, label: 'المخالفات' },
  { to: '/map', icon: Map, label: 'الخريطة' },
  { to: '/reports', icon: FileText, label: 'التقارير' },
  { to: '/settings', icon: Settings, label: 'الإعدادات' },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-56 border-l border-border bg-sidebar min-h-[calc(100vh-6rem)] p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-md'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:shadow-sm'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
