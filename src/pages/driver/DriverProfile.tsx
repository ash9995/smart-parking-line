import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Car, Bell, Globe, LogOut, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function DriverProfile() {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <div className="p-4 space-y-6">
      {/* User Info */}
      <div className="bg-card border border-border p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center">
            <Car className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">محمد العبدالله</h2>
            <p className="text-sm text-muted-foreground">م.abdullah@email.com</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-1">رقم اللوحة المسجل</p>
          <p className="font-semibold text-lg" dir="ltr">أ ب ج ١٢٣٤</p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-1">الإعدادات</h3>
        
        <div className="bg-card border border-border divide-y divide-border">
          {/* Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>الإشعارات</span>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          {/* Language */}
          <button 
            className="flex items-center justify-between p-4 w-full text-right"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          >
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span>اللغة</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{language === 'ar' ? 'العربية' : 'English'}</span>
              <ChevronLeft className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Logout */}
      <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10">
        <LogOut className="h-4 w-4 ml-2" />
        تسجيل الخروج
      </Button>
    </div>
  );
}
