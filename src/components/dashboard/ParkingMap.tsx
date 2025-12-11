import { ParkingSpot } from '@/types/parking';
import { cn } from '@/lib/utils';

interface ParkingMapProps {
  spots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
}

export function ParkingMap({ spots, onSpotClick }: ParkingMapProps) {
  const getSpotColor = (status: ParkingSpot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-primary';
      case 'occupied':
        return 'bg-muted-foreground';
      case 'violation':
        return 'bg-destructive';
    }
  };

  // Group spots by zone
  const spotsByZone = spots.reduce((acc, spot) => {
    if (!acc[spot.zone]) acc[spot.zone] = [];
    acc[spot.zone].push(spot);
    return acc;
  }, {} as Record<string, ParkingSpot[]>);

  return (
    <div className="bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium">خريطة المواقف</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>متاح</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span>مشغول</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span>مخالفة</span>
          </div>
        </div>
      </div>

      {/* Simplified grid map representation */}
      <div className="bg-muted/30 border border-border p-6 min-h-[300px]">
        <div className="grid gap-6">
          {Object.entries(spotsByZone).map(([zone, zoneSpots]) => (
            <div key={zone}>
              <span className="text-xs text-muted-foreground mb-2 block">المنطقة {zone}</span>
              <div className="flex gap-2 flex-wrap">
                {zoneSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => onSpotClick?.(spot)}
                    className={cn(
                      'w-12 h-8 flex items-center justify-center text-xs font-medium transition-transform hover:scale-105',
                      getSpotColor(spot.status),
                      spot.status === 'available' ? 'text-primary-foreground' : 'text-background'
                    )}
                  >
                    {spot.id}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        انقر على موقف لعرض التفاصيل • التحديث كل 5 ثواني
      </p>
    </div>
  );
}
