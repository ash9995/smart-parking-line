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

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app, fetch new data here
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">لوحة التحكم</h2>
            <p className="text-sm text-muted-foreground">مراقبة المواقف والمخالفات في الوقت الفعلي</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-pulse-subtle" />
            <span>آخر تحديث: {formatTime(lastUpdate)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="إجمالي المواقف" value={mockStats.totalSpots} />
          <StatsCard title="المواقف المشغولة" value={mockStats.occupiedSpots} />
          <StatsCard title="المخالفات اليوم" value={mockStats.violationsToday} />
          <StatsCard title="الإيرادات اليوم" value={mockStats.revenueToday} suffix="ريال" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Violations Table */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">المخالفات الأخيرة</h3>
              <span className="text-xs text-muted-foreground">
                {violations.filter((v) => v.status === 'new').length} مخالفة جديدة
              </span>
            </div>
            <ViolationTable violations={violations} onSendToAbsher={handleSendToAbsher} />
          </div>

          {/* Map */}
          <div className="lg:col-span-1">
            <ParkingMap spots={mockParkingSpots} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
