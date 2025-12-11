import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockViolations, mockStats } from '@/data/mockData';

const generateCSV = (data: any[], filename: string) => {
  const headers = Object.keys(data[0] || {}).join(',');
  const rows = data.map(item => 
    Object.values(item).map(val => 
      typeof val === 'object' ? JSON.stringify(val) : val
    ).join(',')
  );
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

const reports = [
  { 
    title: 'تقرير المخالفات اليومي', 
    date: '11 ديسمبر 2025',
    getData: () => mockViolations.map(v => ({
      رقم_المخالفة: v.id,
      رقم_اللوحة: v.plateNumber,
      نوع_المخالفة: v.violationType === 'tilted' ? 'وقوف مائل' : v.violationType === 'double_parking' ? 'وقوف مزدوج' : 'اتجاه خاطئ',
      المبلغ: v.fineAmount,
      الحالة: v.status === 'paid' ? 'مدفوعة' : 'مرسلة',
      التاريخ: v.timestamp.toLocaleString('ar-SA')
    })),
    filename: 'violations_daily'
  },
  { 
    title: 'تقرير الإيرادات الأسبوعي', 
    date: '8 ديسمبر 2025',
    getData: () => [{
      إجمالي_الإيرادات: mockStats.revenueToday * 7,
      المخالفات_المدفوعة: mockViolations.filter(v => v.status === 'paid').length,
      متوسط_قيمة_المخالفة: Math.round(mockViolations.reduce((sum, v) => sum + v.fineAmount, 0) / mockViolations.length),
    }],
    filename: 'revenue_weekly'
  },
  { 
    title: 'تقرير إشغال المواقف', 
    date: '1 ديسمبر 2025',
    getData: () => [{
      إجمالي_المواقف: mockStats.totalSpots,
      المواقف_المشغولة: mockStats.occupiedSpots,
      نسبة_الإشغال: `${Math.round((mockStats.occupiedSpots / mockStats.totalSpots) * 100)}%`,
    }],
    filename: 'occupancy_report'
  },
  { 
    title: 'تقرير أداء النظام', 
    date: '1 ديسمبر 2025',
    getData: () => [{
      المخالفات_اليوم: mockStats.violationsToday,
      الإيرادات_اليوم: mockStats.revenueToday,
      المواقف_المتاحة: mockStats.totalSpots - mockStats.occupiedSpots,
    }],
    filename: 'system_performance'
  },
];

export default function Reports() {
  const handleDownload = (report: typeof reports[0]) => {
    generateCSV(report.getData(), report.filename);
  };

  const handleExportAll = () => {
    reports.forEach(report => {
      generateCSV(report.getData(), report.filename);
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">التقارير</h2>
            <p className="text-sm text-muted-foreground">تقارير وإحصائيات المواقف والمخالفات</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Calendar className="h-4 w-4 ml-2" />
              الفترة
            </Button>
            <Button size="sm" className="rounded-xl" onClick={handleExportAll}>
              <Download className="h-4 w-4 ml-2" />
              تصدير الكل
            </Button>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="المخالفات هذا الشهر" value={342} />
          <StatsCard title="إجمالي الإيرادات" value={58650} suffix="ريال" />
          <StatsCard title="معدل الإشغال" value="69%" />
          <StatsCard title="متوسط وقت الوقوف" value="45 دقيقة" />
        </div>

        {/* Reports List */}
        <div className="bg-card rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden">
          <div className="p-4">
            <h3 className="font-medium">التقارير المتاحة</h3>
          </div>
          <div className="divide-y divide-muted/20">
            {reports.map((report, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-xl hover:bg-primary/10"
                  onClick={() => handleDownload(report)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
