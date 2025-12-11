import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import logo from '@/assets/logo.png';

export function DriverLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 z-10">
        <div className="flex items-center justify-center">
          <img src={logo} alt="المواقف الذكية" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
