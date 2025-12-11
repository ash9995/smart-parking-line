import { useState } from 'react';
import { mockParkingSpots } from '@/data/mockData';
import { ParkingSpot } from '@/types/parking';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusLabels = {
  available: 'متاح',
  occupied: 'مشغول',
  violation: 'مخالفة',
};

export default function DriverMapView() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const availableCount = mockParkingSpots.filter((s) => s.status === 'available').length;

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

  // Group spots by neighborhood for driver view
  const spotsByNeighborhood = mockParkingSpots.reduce((acc, spot) => {
    const neighborhood = spot.neighborhood || 'غير محدد';
    if (!acc[neighborhood]) acc[neighborhood] = [];
    acc[neighborhood].push(spot);
    return acc;
  }, {} as Record<string, ParkingSpot[]>);

  const handleNavigate = () => {
    if (selectedSpot) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.location.lat},${selectedSpot.location.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Header with available count */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">المواقف المتاحة</h2>
        <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-sm font-medium shadow-md">
          {availableCount} موقف متاح
        </span>
      </div>

      {/* Legend */}
      <div className="bg-card border border-border p-3 rounded-2xl shadow-lg flex items-center justify-around">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary shadow-sm" />
          <span className="text-xs">متاح</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-muted-foreground shadow-sm" />
          <span className="text-xs">مشغول</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-destructive shadow-sm" />
          <span className="text-xs">مخالفة</span>
        </div>
      </div>

      {/* Mock Map Grid by Neighborhood */}
      <div className="space-y-4">
        {Object.entries(spotsByNeighborhood).map(([neighborhood, spots]) => (
          <div key={neighborhood} className="bg-card border border-border p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">{neighborhood}</h3>
              <span className="text-xs text-muted-foreground">
                ({spots.filter(s => s.status === 'available').length} متاح)
              </span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {spots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={cn(
                    'w-14 h-10 flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105 rounded-xl shadow-md',
                    getSpotColor(spot.status),
                    spot.status === 'available' ? 'text-primary-foreground' : 'text-background',
                    selectedSpot?.id === spot.id && 'ring-2 ring-primary ring-offset-2'
                  )}
                >
                  <span className="font-bold">{spot.id}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet for Selected Spot */}
      {selectedSpot && (
        <div className="fixed bottom-20 left-4 right-4 bg-card border border-border p-4 z-20 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">موقف {selectedSpot.id}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedSpot.neighborhood} - {selectedSpot.street}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-xl shadow-sm',
                    selectedSpot.status === 'available'
                      ? 'bg-primary text-primary-foreground'
                      : selectedSpot.status === 'occupied'
                      ? 'bg-muted-foreground text-background'
                      : 'bg-destructive text-destructive-foreground'
                  )}
                >
                  {statusLabels[selectedSpot.status]}
                </span>
                <button 
                  onClick={() => setSelectedSpot(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 rounded-xl shadow-md h-12" 
                onClick={handleNavigate} 
                disabled={selectedSpot.status !== 'available'}
              >
                <Navigation className="h-5 w-5 ml-2" />
                انتقل للموقف
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
