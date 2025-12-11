import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">التقارير</h2>
            <p className="text-sm text-muted-foreground">تقارير وإحصائيات المواقف والمخالفات</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 ml-2" />
              الفترة
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="المخالفات هذا الشهر" value={342} />
          <StatsCard title="إجمالي الإيرادات" value={58650} suffix="ريال" />
          <StatsCard title="معدل الإشغال" value="69%" />
          <StatsCard title="متوسط وقت الوقوف" value="45 دقيقة" />
        </div>

        {/* Reports List */}
        <div className="bg-card border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium">التقارير المتاحة</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { title: 'تقرير المخالفات اليومي', date: '11 ديسمبر 2025' },
              { title: 'تقرير الإيرادات الأسبوعي', date: '8 ديسمبر 2025' },
              { title: 'تقرير إشغال المواقف', date: '1 ديسمبر 2025' },
              { title: 'تقرير أداء النظام', date: '1 ديسمبر 2025' },
            ].map((report, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
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
