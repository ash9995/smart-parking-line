export interface Violation {
  id: string;
  spotId: string;
  plateNumber: string;
  violationType: 'tilted' | 'double_parking' | 'wrong_direction';
  timestamp: Date;
  status: 'new' | 'sent' | 'paid';
  photoUrl?: string;
  fineAmount: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface ParkingSpot {
  id: string;
  status: 'available' | 'occupied' | 'violation';
  location: {
    lat: number;
    lng: number;
  };
  zone: string;
  neighborhood?: string;
  street?: string;
}

export interface DashboardStats {
  totalSpots: number;
  occupiedSpots: number;
  violationsToday: number;
  revenueToday: number;
}

export const violationTypeLabels: Record<Violation['violationType'], string> = {
  tilted: 'وقوف مائل',
  double_parking: 'شغل موقفين',
  wrong_direction: 'اتجاه خاطئ',
};

export const statusLabels: Record<Violation['status'], string> = {
  new: 'جديد',
  sent: 'تم الإرسال',
  paid: 'مدفوع',
};
