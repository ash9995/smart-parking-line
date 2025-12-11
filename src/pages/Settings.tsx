import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, Globe, Shield, Database } from 'lucide-react';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 max-w-2xl p-2 sm:p-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">الإعدادات</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">إدارة إعدادات النظام والتكامل</p>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">الإشعارات</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div>
                <p className="text-sm font-medium">تنبيهات النظام</p>
                <p className="text-xs text-muted-foreground">إشعارات حول حالة النظام والأعطال</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div>
                <p className="text-sm font-medium">تقارير يومية</p>
                <p className="text-xs text-muted-foreground">استلام ملخص يومي للمخالفات</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">اللغة والمنطقة</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="rounded-xl shadow-md">العربية</Button>
            <Button variant="outline" size="sm" className="rounded-xl shadow-md">English</Button>
          </div>
        </div>

        {/* Integration */}
        <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">التكامل مع الأنظمة</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 border border-border rounded-xl shadow-sm">
              <div>
                <p className="text-sm font-medium">نظام أبشر</p>
                <p className="text-xs text-muted-foreground">متصل - إرسال تلقائي للمخالفات</p>
              </div>
              <span className="w-3 h-3 bg-primary rounded-full shadow-md animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/30 border border-border rounded-xl shadow-sm">
              <div>
                <p className="text-sm font-medium">إدارة المرور</p>
                <p className="text-xs text-muted-foreground">متصل - التحقق من اللوحات</p>
              </div>
              <span className="w-3 h-3 bg-primary rounded-full shadow-md animate-pulse" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium">الأمان</h3>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl shadow-md">تغيير كلمة المرور</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
