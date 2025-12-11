import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockParkingSpots } from '@/data/mockData';
import { ParkingSpot } from '@/types/parking';
import { cn } from '@/lib/utils';
import { Navigation, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapView() {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const availableCount = mockParkingSpots.filter((s) => s.status === 'available').length;
  const occupiedCount = mockParkingSpots.filter((s) => s.status === 'occupied').length;
  const violationCount = mockParkingSpots.filter((s) => s.status === 'violation').length;

  const getSpotColor = (status: ParkingSpot['status']) => {
    switch (status) {
      case 'available':
        return '#0F824B';
      case 'occupied':
        return '#6B7280';
      case 'violation':
        return '#DC2626';
    }
  };

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
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [46.6753, 24.7136], // Riyadh center
      zoom: 14,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');

    map.current.on('load', () => {
      setIsMapReady(true);

      // Add markers for each parking spot
      mockParkingSpots.forEach((spot) => {
        const el = document.createElement('div');
        el.className = 'parking-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = getSpotColor(spot.status);
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '10px';
        el.style.fontWeight = 'bold';
        el.style.color = 'white';

        el.addEventListener('click', () => {
          setSelectedSpot(spot);
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([spot.location.lng, spot.location.lat])
          .addTo(map.current!);

        markersRef.current.push(marker);
      });
    });
  };

  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, []);

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
          {/* Map Area */}
          <div className="lg:col-span-2 bg-card border border-border min-h-[500px] relative overflow-hidden">
            {!mapboxToken ? (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-4 text-center">
                  <Key className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="font-medium text-lg">أدخل مفتاح Mapbox</h3>
                  <p className="text-sm text-muted-foreground">
                    للوصول إلى الخريطة، يرجى إدخال مفتاح Mapbox العام الخاص بك
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="pk.eyJ1..."
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      className="text-left"
                      dir="ltr"
                    />
                    <Button onClick={initializeMap} disabled={!mapboxToken}>
                      تفعيل
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={mapContainer} className="absolute inset-0" />
            )}
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
                      'px-2 py-0.5 text-xs font-medium rounded',
                      selectedSpot.status === 'available' && 'bg-primary text-primary-foreground',
                      selectedSpot.status === 'occupied' && 'bg-muted-foreground text-background',
                      selectedSpot.status === 'violation' && 'bg-destructive text-destructive-foreground'
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

                <Button className="w-full" variant="outline" onClick={handleNavigate}>
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
