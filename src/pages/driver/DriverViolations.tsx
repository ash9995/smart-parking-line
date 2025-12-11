import { mockViolations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Calendar, Car, CheckCircle } from 'lucide-react';

const violationTypeLabels: Record<string, string> = {
  tilted: 'وقوف مائل',
  double_parking: 'شغل موقفين',
  wrong_direction: 'اتجاه خاطئ',
};

const statusLabels: Record<string, string> = {
  new: 'غير مدفوع',
  sent: 'في الانتظار',
  paid: 'مدفوع',
};

export default function DriverViolations() {
  const userViolations = mockViolations;

  const totalUnpaid = userViolations
    .filter((v) => v.status !== 'paid')
    .reduce((sum, v) => sum + v.fineAmount, 0);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const handlePayViolation = () => {
    window.open('https://www.absher.sa/', '_blank');
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Summary Card */}
      <div className="bg-primary text-primary-foreground p-5 space-y-2 rounded-2xl shadow-xl">
        <p className="text-sm opacity-90">إجمالي المستحقات</p>
        <p className="text-3xl font-bold">{totalUnpaid.toLocaleString('ar-SA')} ريال</p>
        <p className="text-sm opacity-90">{userViolations.filter((v) => v.status !== 'paid').length} مخالفات غير مسددة</p>
      </div>

      {/* Violations List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">سجل المخالفات</h2>

        {userViolations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl shadow-lg">
            <Car className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد مخالفات مسجلة</p>
          </div>
        ) : (
          userViolations.map((violation) => (
            <div
              key={violation.id}
              className="bg-card border border-border p-4 space-y-3 rounded-2xl shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{violationTypeLabels[violation.violationType]}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>الموقف {violation.spotId}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl shadow-sm flex items-center gap-1 ${
                    violation.status === 'paid'
                      ? 'bg-primary/10 text-primary'
                      : violation.status === 'sent'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {violation.status === 'paid' && <CheckCircle className="h-3 w-3" />}
                  {statusLabels[violation.status]}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(violation.timestamp)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Car className="h-3 w-3" />
                  <span dir="ltr">{violation.plateNumber}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <p className="font-semibold text-lg">
                  {violation.fineAmount.toLocaleString('ar-SA')} ريال
                </p>
                {violation.status !== 'paid' && (
                  <Button
                    size="sm"
                    onClick={handlePayViolation}
                    className="rounded-xl shadow-md"
                  >
                    <ExternalLink className="h-4 w-4 ml-2" />
                    دفع عبر أبشر
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
