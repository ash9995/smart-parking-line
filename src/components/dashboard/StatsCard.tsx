import { cn } from '@/lib/utils';
import { ParkingSpot } from '@/types/parking';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { useState } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  className?: string;
  spots?: ParkingSpot[];
  expandable?: boolean;
}

export function StatsCard({ title, value, suffix, className, spots, expandable }: StatsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group spots by neighborhood
  const spotsByNeighborhood = spots?.reduce((acc, spot) => {
    const neighborhood = spot.neighborhood || 'غير محدد';
    if (!acc[neighborhood]) acc[neighborhood] = [];
    acc[neighborhood].push(spot);
    return acc;
  }, {} as Record<string, ParkingSpot[]>);

  return (
    <div
      className={cn(
        'bg-card border border-primary/20 p-4 sm:p-6 flex flex-col rounded-2xl shadow-lg transition-all duration-300',
        expandable && 'cursor-pointer hover:shadow-xl',
        className
      )}
      onClick={() => expandable && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs sm:text-sm font-medium">{title}</span>
        {expandable && (
          <button className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-full">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>
      <span className="text-2xl sm:text-3xl font-bold text-primary mt-2">
        {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
        {suffix && <span className="text-base sm:text-lg font-normal mr-1">{suffix}</span>}
      </span>

      {/* Expandable list of occupied spots by neighborhood */}
      {expandable && isExpanded && spotsByNeighborhood && (
        <div className="mt-4 pt-4 border-t border-border space-y-3 max-h-60 overflow-y-auto">
          {Object.entries(spotsByNeighborhood).map(([neighborhood, neighborhoodSpots]) => (
            <div key={neighborhood} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-3 w-3 text-primary" />
                <span>{neighborhood}</span>
                <span className="text-xs text-muted-foreground">({neighborhoodSpots.length})</span>
              </div>
              <div className="pr-5 space-y-1">
                {neighborhoodSpots.map((spot) => (
                  <div key={spot.id} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="font-medium text-foreground">{spot.id}</span>
                    <span>-</span>
                    <span>{spot.street}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
