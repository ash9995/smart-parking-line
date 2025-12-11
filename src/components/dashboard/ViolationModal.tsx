import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Violation, violationTypeLabels, statusLabels } from '@/types/parking';
import { MapPin, Clock, Car, CreditCard } from 'lucide-react';

interface ViolationModalProps {
  violation: Violation | null;
  open: boolean;
  onClose: () => void;
}

export function ViolationModal({ violation, open, onClose }: ViolationModalProps) {
  if (!violation) return null;

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">تفاصيل المخالفة</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Placeholder for violation photo */}
          <div className="aspect-video bg-muted flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <Car className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <span className="text-sm">صورة المخالفة</span>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">الموقف:</span>
              <span className="font-medium">{violation.spotId}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">الوقت:</span>
              <span className="font-medium">{formatDateTime(violation.timestamp)}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Car className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">رقم اللوحة:</span>
              <span className="font-medium">{violation.plateNumber}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">الغرامة:</span>
              <span className="font-medium text-primary">{violation.fineAmount} ريال</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">نوع المخالفة</span>
            <span className="font-medium">{violationTypeLabels[violation.violationType]}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">الحالة</span>
            <span className="font-medium">{statusLabels[violation.status]}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
