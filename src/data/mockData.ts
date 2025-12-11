import { Violation, ParkingSpot, DashboardStats } from '@/types/parking';

export const mockStats: DashboardStats = {
  totalSpots: 450,
  occupiedSpots: 312,
  violationsToday: 28,
  revenueToday: 4200,
};

export const mockViolations: Violation[] = [
  {
    id: '1',
    spotId: 'A12',
    plateNumber: 'أ ب ج ١٢٣٤',
    violationType: 'tilted',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'new',
    fineAmount: 150,
    location: { lat: 24.7136, lng: 46.6753 },
  },
  {
    id: '2',
    spotId: 'B05',
    plateNumber: 'ر س ط ٥٦٧٨',
    violationType: 'double_parking',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: 'sent',
    fineAmount: 200,
    location: { lat: 24.7140, lng: 46.6760 },
  },
  {
    id: '3',
    spotId: 'C08',
    plateNumber: 'ع م ن ٩٠١٢',
    violationType: 'wrong_direction',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'paid',
    fineAmount: 150,
    location: { lat: 24.7125, lng: 46.6745 },
  },
  {
    id: '4',
    spotId: 'A03',
    plateNumber: 'ق و ي ٣٤٥٦',
    violationType: 'tilted',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'new',
    fineAmount: 150,
    location: { lat: 24.7150, lng: 46.6770 },
  },
  {
    id: '5',
    spotId: 'D11',
    plateNumber: 'ز ح خ ٧٨٩٠',
    violationType: 'double_parking',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: 'sent',
    fineAmount: 200,
    location: { lat: 24.7130, lng: 46.6740 },
  },
];

export const mockParkingSpots: ParkingSpot[] = [
  { id: 'A01', status: 'available', location: { lat: 24.7136, lng: 46.6753 }, zone: 'A' },
  { id: 'A02', status: 'occupied', location: { lat: 24.7137, lng: 46.6754 }, zone: 'A' },
  { id: 'A03', status: 'violation', location: { lat: 24.7138, lng: 46.6755 }, zone: 'A' },
  { id: 'A04', status: 'available', location: { lat: 24.7139, lng: 46.6756 }, zone: 'A' },
  { id: 'B01', status: 'occupied', location: { lat: 24.7140, lng: 46.6757 }, zone: 'B' },
  { id: 'B02', status: 'available', location: { lat: 24.7141, lng: 46.6758 }, zone: 'B' },
  { id: 'B03', status: 'available', location: { lat: 24.7142, lng: 46.6759 }, zone: 'B' },
  { id: 'B04', status: 'occupied', location: { lat: 24.7143, lng: 46.6760 }, zone: 'B' },
  { id: 'C01', status: 'available', location: { lat: 24.7144, lng: 46.6761 }, zone: 'C' },
  { id: 'C02', status: 'violation', location: { lat: 24.7145, lng: 46.6762 }, zone: 'C' },
];
