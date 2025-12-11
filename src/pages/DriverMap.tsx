import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mockParkingSpots } from '@/data/mockData';
import { ParkingSpot } from '@/types/parking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation, MapPin, Car } from 'lucide-react';

export default function DriverMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState(false);

  const availableCount = mockParkingSpots.filter((s) => s.status === 'available').length;

  const statusLabels = {
    available: 'متاح',
    occupied: 'مشغول',
    violation: 'مخالفة',
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [46.6753, 24.7136], // Riyadh coordinates
      zoom: 14,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-left'
    );

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'top-left'
    );

    // Add parking spot markers
    map.current.on('load', () => {
      mockParkingSpots.forEach((spot) => {
        const el = document.createElement('div');
        el.className = 'parking-marker';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.cursor = 'pointer';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        el.style.fontSize = '12px';
        el.style.fontWeight = 'bold';
        el.style.color = 'white';

        if (spot.status === 'available') {
          el.style.backgroundColor = '#0F824B';
        } else if (spot.status === 'occupied') {
          el.style.backgroundColor = '#6b7280';
        } else {
          el.style.backgroundColor = '#dc2626';
        }

        el.innerHTML = spot.id;

        el.addEventListener('click', () => {
          setSelectedSpot(spot);
        });

        new mapboxgl.Marker(el)
          .setLngLat([spot.location.lng, spot.location.lat])
          .addTo(map.current!);
      });

      setIsMapReady(true);
    });
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  const handleNavigate = () => {
    if (selectedSpot) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.location.lat},${selectedSpot.location.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!mapboxToken || !isMapReady) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        {/* Header */}
        <header className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6" />
            <h1 className="text-xl font-bold">المواقف الذكية</h1>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {!mapboxToken ? (
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 mx-auto text-primary" />
                <h2 className="text-lg font-semibold">إعداد الخريطة</h2>
                <p className="text-sm text-muted-foreground">
                  أدخل مفتاح Mapbox للوصول إلى الخريطة
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="pk.eyJ1Ijoi..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="text-left"
                  dir="ltr"
                />
                <Button 
                  className="w-full" 
                  onClick={initializeMap}
                  disabled={!mapboxToken}
                >
                  تفعيل الخريطة
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                احصل على المفتاح من{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-2">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="text-sm text-muted-foreground">جاري تحميل الخريطة...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6" />
            <h1 className="text-xl font-bold">المواقف الذكية</h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-white" />
            <span>{availableCount} متاح</span>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="absolute inset-0" />

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-card border border-border p-3 space-y-2 text-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span>متاح</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-muted-foreground" />
            <span>مشغول</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-destructive" />
            <span>مخالفة</span>
          </div>
        </div>

        {/* Bottom Sheet - Selected Spot */}
        {selectedSpot && (
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-10">
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">موقف {selectedSpot.id}</h3>
                  <p className="text-sm text-muted-foreground">المنطقة {selectedSpot.zone}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium ${
                    selectedSpot.status === 'available'
                      ? 'bg-primary text-primary-foreground'
                      : selectedSpot.status === 'occupied'
                      ? 'bg-muted-foreground text-background'
                      : 'bg-destructive text-destructive-foreground'
                  }`}
                >
                  {statusLabels[selectedSpot.status]}
                </span>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  onClick={handleNavigate}
                  disabled={selectedSpot.status !== 'available'}
                >
                  <Navigation className="h-4 w-4 ml-2" />
                  انتقل للموقف
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedSpot(null)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
