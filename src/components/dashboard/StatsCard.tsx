import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  className?: string;
}

export function StatsCard({ title, value, suffix, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-primary/20 p-6 flex flex-col items-center justify-center min-h-[120px]',
        className
      )}
    >
      <span className="text-muted-foreground text-sm font-medium mb-2">{title}</span>
      <span className="text-3xl font-bold text-primary">
        {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
        {suffix && <span className="text-lg font-normal mr-1">{suffix}</span>}
      </span>
    </div>
  );
}
