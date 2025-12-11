import { useState } from 'react';
import { Violation, violationTypeLabels, statusLabels } from '@/types/parking';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Send, Eye } from 'lucide-react';
import { ViolationModal } from './ViolationModal';
import { toast } from 'sonner';

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

  const handleSendToAbsher = (violation: Violation) => {
    if (violation.status !== 'new') {
      toast.error('تم إرسال هذه المخالفة مسبقاً');
      return;
    }
    onSendToAbsher(violation.id);
    toast.success('تم الإرسال بنجاح إلى أبشر');
  };

  return (
    <>
      <div className="bg-card border border-border overflow-hidden">
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
                    violation.status === 'new' && 'border-r-2 border-r-primary'
                  )}
                >
                  <td className="py-4 px-4 text-sm">{formatTime(violation.timestamp)}</td>
                  <td className="py-4 px-4 text-sm font-medium">{violation.spotId}</td>
                  <td className="py-4 px-4 text-sm">{violationTypeLabels[violation.violationType]}</td>
                  <td className="py-4 px-4 text-sm font-medium">{violation.plateNumber}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        'inline-flex px-2 py-1 text-xs font-medium rounded-sm',
                        violation.status === 'new' && 'bg-accent text-accent-foreground',
                        violation.status === 'sent' && 'bg-warning/10 text-warning-foreground',
                        violation.status === 'paid' && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {statusLabels[violation.status]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedViolation(violation)}
                        className="h-8 px-2"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={violation.status === 'new' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleSendToAbsher(violation)}
                        disabled={violation.status !== 'new'}
                        className="h-8 text-xs"
                      >
                        <Send className="h-3 w-3 ml-1" />
                        إرسال لأبشر
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViolationModal
        violation={selectedViolation}
        open={!!selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />
    </>
  );
}
