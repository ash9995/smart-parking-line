import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import logo from '@/assets/logo.png';

export function DriverLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border p-3 sm:p-4 z-10 shadow-lg rounded-b-2xl">
        <div className="flex items-center justify-center">
          <img src={logo} alt="المواقف الذكية" className="h-14 sm:h-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
