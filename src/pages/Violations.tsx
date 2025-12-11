import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ViolationTable } from '@/components/dashboard/ViolationTable';
import { mockViolations } from '@/data/mockData';
import { Violation } from '@/types/parking';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';

export default function Violations() {
  const [violations, setViolations] = useState<Violation[]>(mockViolations);
  const [filter, setFilter] = useState<'all' | 'new' | 'sent' | 'paid'>('all');

  const handleSendToAbsher = (id: string) => {
    setViolations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'sent' as const } : v))
    );
  };

  const filteredViolations = violations.filter((v) => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  const filterLabels = {
    all: 'الكل',
    new: 'جديد',
    sent: 'تم الإرسال',
    paid: 'مدفوع',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">سجل المخالفات</h2>
            <p className="text-sm text-muted-foreground">عرض وإدارة جميع المخالفات</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {Object.entries(filterLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(key as typeof filter)}
            >
              {label}
            </Button>
          ))}
        </div>

        <ViolationTable violations={filteredViolations} onSendToAbsher={handleSendToAbsher} />
      </div>
    </DashboardLayout>
  );
}
