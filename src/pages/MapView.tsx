import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockParkingSpots } from '@/data/mockData';
import { ParkingSpot } from '@/types/parking';
import { cn } from '@/lib/utils';
import { Navigation, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapView() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [sentViolations, setSentViolations] = useState<Set<string>>(new Set());

  const availableCount = mockParkingSpots.filter((s) => s.status === 'available').length;
  const occupiedCount = mockParkingSpots.filter((s) => s.status === 'occupied').length;
  const violationCount = mockParkingSpots.filter((s) => s.status === 'violation').length;

  const statusLabels = {
    available: 'متاح',
    occupied: 'مشغول',
    violation: 'مخالفة',
  };

  // Auto-send tickets for violations (silently, no notifications)
  useEffect(() => {
    const violationSpots = mockParkingSpots.filter(s => s.status === 'violation');
    
    violationSpots.forEach((spot) => {
      if (!sentViolations.has(spot.id)) {
        // Simulate auto-sending to Absher silently
        setTimeout(() => {
          setSentViolations(prev => new Set(prev).add(spot.id));
        }, 1000 + Math.random() * 2000);
      }
    });
  }, [sentViolations]);

  const handleNavigate = () => {
    if (selectedSpot) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.location.lat},${selectedSpot.location.lng}`,
        '_blank'
      );
    }
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
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-sm">متاح ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-muted-foreground" />
            <span className="text-sm">مشغول ({occupiedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-destructive" />
            <span className="text-sm">مخالفة ({violationCount})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mock Map Area */}
          <div className="lg:col-span-2 bg-card rounded-xl shadow-lg min-h-[500px] relative overflow-hidden">
            {/* Simple Mock Map Grid */}
            <div className="absolute inset-0 p-4">
              <div className="w-full h-full bg-muted/30 rounded-lg relative">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-border/30" />
                  ))}
                </div>
                
                {/* Road lines */}
                <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-muted-foreground/20" />
                <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-muted-foreground/20" />
                
                {/* Parking spot markers */}
                {mockParkingSpots.map((spot, index) => {
                  const row = Math.floor(index / 4);
                  const col = index % 4;
                  const top = 10 + row * 20;
                  const left = 10 + col * 22;
                  
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      className={cn(
                        'absolute w-10 h-10 rounded-full border-4 border-card shadow-lg transition-all hover:scale-110 flex items-center justify-center',
                        selectedSpot?.id === spot.id && 'ring-4 ring-primary/50 scale-110',
                        spot.status === 'available' && 'bg-primary',
                        spot.status === 'occupied' && 'bg-muted-foreground',
                        spot.status === 'violation' && 'bg-destructive'
                      )}
                      style={{ top: `${top}%`, left: `${left}%` }}
                    >
                      {spot.status === 'violation' && sentViolations.has(spot.id) && (
                        <CheckCircle className="h-4 w-4 text-destructive-foreground" />
                      )}
                      {spot.status === 'violation' && !sentViolations.has(spot.id) && (
                        <Send className="h-3 w-3 text-destructive-foreground animate-pulse" />
                      )}
                    </button>
                  );
                })}
                
                {/* Zone labels */}
                <div className="absolute top-4 right-4 text-xs font-medium text-muted-foreground bg-card/80 px-2 py-1 rounded">
                  المنطقة A
                </div>
                <div className="absolute top-4 left-4 text-xs font-medium text-muted-foreground bg-card/80 px-2 py-1 rounded">
                  المنطقة B
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-medium text-muted-foreground bg-card/80 px-2 py-1 rounded">
                  المنطقة C
                </div>
                <div className="absolute bottom-4 left-4 text-xs font-medium text-muted-foreground bg-card/80 px-2 py-1 rounded">
                  المنطقة D
                </div>
              </div>
            </div>
          </div>

          {/* Spot Details Sidebar */}
          <div className="bg-card rounded-xl shadow-lg p-6">
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
                  {selectedSpot.neighborhood && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الحي</span>
                      <span className="font-medium">{selectedSpot.neighborhood}</span>
                    </div>
                  )}
                  {selectedSpot.street && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الشارع</span>
                      <span className="font-medium">{selectedSpot.street}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحالة</span>
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded',
                      selectedSpot.status === 'available' && 'bg-primary text-primary-foreground',
                      selectedSpot.status === 'occupied' && 'bg-muted-foreground text-card',
                      selectedSpot.status === 'violation' && 'bg-destructive text-destructive-foreground'
                    )}>
                      {statusLabels[selectedSpot.status]}
                    </span>
                  </div>
                  {selectedSpot.status === 'violation' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">حالة الإرسال</span>
                      <span className={cn(
                        'px-2 py-0.5 text-xs font-medium rounded flex items-center gap-1',
                        sentViolations.has(selectedSpot.id) 
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-warning text-warning-foreground'
                      )}>
                        {sentViolations.has(selectedSpot.id) ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            تم الإرسال
                          </>
                        ) : (
                          <>
                            <Send className="h-3 w-3 animate-pulse" />
                            جاري الإرسال...
                          </>
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الإحداثيات</span>
                    <span className="text-xs font-mono">
                      {selectedSpot.location.lat.toFixed(4)}, {selectedSpot.location.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <Button className="w-full rounded-lg" variant="outline" onClick={handleNavigate}>
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
