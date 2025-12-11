import { ParkingSpot } from '@/types/parking';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface ParkingMapProps {
  spots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
}

export function ParkingMap({ spots, onSpotClick }: ParkingMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

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

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    onSpotClick?.(spot);
  };

  return (
    <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h3 className="font-medium text-sm sm:text-base">خريطة المواقف</h3>
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary shadow-sm" />
            <span>متاح</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-muted-foreground shadow-sm" />
            <span>مشغول</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive shadow-sm" />
            <span>مخالفة</span>
          </div>
        </div>
      </div>

      {/* Simplified grid map representation */}
      <div className="bg-muted/30 border border-border p-4 sm:p-6 min-h-[250px] sm:min-h-[300px] rounded-xl shadow-inner">
        <div className="grid gap-4 sm:gap-6">
          {Object.entries(spotsByZone).map(([zone, zoneSpots]) => (
            <div key={zone}>
              <span className="text-xs text-muted-foreground mb-2 block">المنطقة {zone}</span>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {zoneSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => handleSpotClick(spot)}
                    className={cn(
                      'w-10 sm:w-12 h-7 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs font-medium transition-all duration-200 hover:scale-110 rounded-lg shadow-md',
                      getSpotColor(spot.status),
                      spot.status === 'available' ? 'text-primary-foreground' : 'text-background',
                      selectedSpot?.id === spot.id && 'ring-2 ring-primary ring-offset-2'
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

      {/* Selected spot details */}
      {selectedSpot && (
        <div className="mt-4 p-3 sm:p-4 bg-accent/50 border border-border rounded-xl shadow-md animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">{selectedSpot.id}</p>
                {selectedSpot.neighborhood && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedSpot.neighborhood} - {selectedSpot.street}
                  </p>
                )}
              </div>
            </div>
            <button 
              onClick={() => setSelectedSpot(null)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}

      <p className="text-[10px] sm:text-xs text-muted-foreground mt-4 text-center">
        انقر على موقف لعرض التفاصيل • التحديث كل 5 ثواني
      </p>
    </div>
  );
}
