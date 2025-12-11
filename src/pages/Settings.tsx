import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, Globe, Shield, Database } from 'lucide-react';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-2xl font-bold">الإعدادات</h2>
          <p className="text-sm text-muted-foreground">إدارة إعدادات النظام والتكامل</p>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-medium">الإشعارات</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">إشعارات المخالفات الجديدة</p>
                <p className="text-xs text-muted-foreground">استلام إشعار عند رصد مخالفة جديدة</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">تنبيهات النظام</p>
                <p className="text-xs text-muted-foreground">إشعارات حول حالة النظام والأعطال</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-card border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-medium">اللغة والمنطقة</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm">العربية</Button>
            <Button variant="outline" size="sm">English</Button>
          </div>
        </div>

        {/* Integration */}
        <div className="bg-card border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="font-medium">التكامل مع الأنظمة</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium">نظام أبشر</p>
                <p className="text-xs text-muted-foreground">متصل</p>
              </div>
              <span className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 border border-border">
              <div>
                <p className="text-sm font-medium">إدارة المرور</p>
                <p className="text-xs text-muted-foreground">متصل</p>
              </div>
              <span className="w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-medium">الأمان</h3>
          </div>
          <Button variant="outline" size="sm">تغيير كلمة المرور</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
