import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ViolationTable } from '@/components/dashboard/ViolationTable';
import { ParkingMap } from '@/components/dashboard/ParkingMap';
import { mockStats, mockViolations, mockParkingSpots } from '@/data/mockData';
import { Violation } from '@/types/parking';
import { RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const [violations, setViolations] = useState<Violation[]>(mockViolations);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh every 5 seconds - violations are automatically sent to Absher
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app, new violations are automatically detected and sent to Absher
      // They appear directly in the سجل المخالفات without notification
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendToAbsher = (id: string) => {
    setViolations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'sent' as const } : v))
    );
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  // Filter occupied spots for the stats card
  const occupiedSpots = mockParkingSpots.filter(spot => spot.status === 'occupied');

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">لوحة التحكم</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">مراقبة المواقف والمخالفات في الوقت الفعلي</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card px-3 py-2 rounded-xl shadow-sm">
            <RefreshCw className="h-3 w-3 animate-pulse-subtle" />
            <span>آخر تحديث: {formatTime(lastUpdate)}</span>
          </div>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatsCard title="إجمالي المواقف" value={mockStats.totalSpots} />
          <StatsCard 
            title="المواقف المشغولة" 
            value={mockStats.occupiedSpots} 
            spots={occupiedSpots}
            expandable={true}
          />
          <StatsCard title="المخالفات اليوم" value={mockStats.violationsToday} />
          <StatsCard title="الإيرادات اليوم" value={mockStats.revenueToday} suffix="ريال" />
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Violations Table */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-medium text-sm sm:text-base">سجل المخالفات</h3>
              <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded-lg">
                {violations.filter((v) => v.status === 'sent').length} مخالفة مرسلة تلقائياً
              </span>
            </div>
            <ViolationTable violations={violations} onSendToAbsher={handleSendToAbsher} />
          </div>

          {/* Map */}
          <div className="xl:col-span-1 order-1 xl:order-2">
            <ParkingMap spots={mockParkingSpots} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
