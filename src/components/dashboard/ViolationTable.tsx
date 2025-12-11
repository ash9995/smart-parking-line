import { useState } from 'react';
import { Violation, violationTypeLabels, statusLabels } from '@/types/parking';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eye, CheckCircle } from 'lucide-react';
import { ViolationModal } from './ViolationModal';

interface ViolationTableProps {
  violations: Violation[];
  onSendToAbsher: (id: string) => void;
}

export function ViolationTable({ violations, onSendToAbsher }: ViolationTableProps) {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block bg-card border border-border overflow-hidden rounded-2xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">الوقت</th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">الموقف</th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">نوع المخالفة</th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">رقم اللوحة</th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">الحالة</th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground text-sm">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {violations.map((violation) => (
                <tr
                  key={violation.id}
                  className={cn(
                    'border-b border-border last:border-0 transition-colors hover:bg-muted/30',
                    violation.status === 'new' && 'border-r-4 border-r-primary'
                  )}
                >
                  <td className="py-4 px-4 text-sm">{formatTime(violation.timestamp)}</td>
                  <td className="py-4 px-4 text-sm font-medium">{violation.spotId}</td>
                  <td className="py-4 px-4 text-sm">{violationTypeLabels[violation.violationType]}</td>
                  <td className="py-4 px-4 text-sm font-medium">{violation.plateNumber}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full shadow-sm',
                        violation.status === 'new' && 'bg-accent text-accent-foreground',
                        violation.status === 'sent' && 'bg-primary/10 text-primary',
                        violation.status === 'paid' && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {violation.status === 'sent' && <CheckCircle className="h-3 w-3" />}
                      {statusLabels[violation.status]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedViolation(violation)}
                      className="h-8 px-3 rounded-xl"
                    >
                      <Eye className="h-4 w-4 ml-1" />
                      عرض
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {violations.map((violation) => (
          <div
            key={violation.id}
            className={cn(
              'bg-card border border-border p-4 rounded-2xl shadow-lg',
              violation.status === 'new' && 'border-r-4 border-r-primary'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-sm">{violation.spotId}</p>
                <p className="text-xs text-muted-foreground">{formatTime(violation.timestamp)}</p>
              </div>
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full shadow-sm',
                  violation.status === 'new' && 'bg-accent text-accent-foreground',
                  violation.status === 'sent' && 'bg-primary/10 text-primary',
                  violation.status === 'paid' && 'bg-muted text-muted-foreground'
                )}
              >
                {violation.status === 'sent' && <CheckCircle className="h-3 w-3" />}
                {statusLabels[violation.status]}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">نوع المخالفة</span>
                <span>{violationTypeLabels[violation.violationType]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">رقم اللوحة</span>
                <span className="font-medium">{violation.plateNumber}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedViolation(violation)}
              className="w-full rounded-xl shadow-sm"
            >
              <Eye className="h-4 w-4 ml-1" />
              عرض التفاصيل
            </Button>
          </div>
        ))}
      </div>

      <ViolationModal
        violation={selectedViolation}
        open={!!selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />
    </>
  );
}
