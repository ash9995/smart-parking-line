import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockParkingSpots } from '@/data/mockData';
import { ParkingSpot } from '@/types/parking';
import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapView() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const availableCount = mockParkingSpots.filter((s) => s.status === 'available').length;
  const occupiedCount = mockParkingSpots.filter((s) => s.status === 'occupied').length;
  const violationCount = mockParkingSpots.filter((s) => s.status === 'violation').length;

  const getSpotColor = (status: ParkingSpot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-primary text-primary-foreground';
      case 'occupied':
        return 'bg-muted-foreground text-background';
      case 'violation':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  const statusLabels = {
    available: 'متاح',
    occupied: 'مشغول',
    violation: 'مخالفة',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">خريطة المواقف</h2>
            <p className="text-sm text-muted-foreground">عرض حالة المواقف في الوقت الفعلي</p>
          </div>
        </div>

        {/* Summary */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary" />
            <span className="text-sm">متاح ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted-foreground" />
            <span className="text-sm">مشغول ({occupiedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive" />
            <span className="text-sm">مخالفة ({violationCount})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Map Area */}
          <div className="lg:col-span-2 bg-muted/30 border border-border min-h-[500px] p-8">
            <div className="grid grid-cols-5 gap-3">
              {mockParkingSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={cn(
                    'aspect-[3/2] flex flex-col items-center justify-center text-sm font-medium transition-all',
                    getSpotColor(spot.status),
                    selectedSpot?.id === spot.id && 'ring-2 ring-offset-2 ring-primary'
                  )}
                >
                  <MapPin className="h-4 w-4 mb-1" />
                  {spot.id}
                </button>
              ))}
            </div>
          </div>

          {/* Spot Details Sidebar */}
          <div className="bg-card border border-border p-6">
            {selectedSpot ? (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">تفاصيل الموقف</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رقم الموقف</span>
                    <span className="font-medium">{selectedSpot.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المنطقة</span>
                    <span className="font-medium">{selectedSpot.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحالة</span>
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-medium',
                      getSpotColor(selectedSpot.status)
                    )}>
                      {statusLabels[selectedSpot.status]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الإحداثيات</span>
                    <span className="text-xs font-mono">
                      {selectedSpot.location.lat.toFixed(4)}, {selectedSpot.location.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Navigation className="h-4 w-4 ml-2" />
                  فتح في الخرائط
                </Button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                اختر موقفاً لعرض التفاصيل
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
