import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Car } from 'lucide-react';

export function DriverLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 z-10">
        <div className="flex items-center gap-3">
          <Car className="h-6 w-6" />
          <h1 className="text-xl font-bold">المواقف الذكية</h1>
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
