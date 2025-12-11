import { Violation, ParkingSpot, DashboardStats } from '@/types/parking';

export const mockStats: DashboardStats = {
  totalSpots: 520,
  occupiedSpots: 385,
  violationsToday: 42,
  revenueToday: 6300,
};

export const mockViolations: Violation[] = [
  {
    id: '1',
    spotId: 'A12',
    plateNumber: 'أ ب ج ١٢٣٤',
    violationType: 'tilted',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'sent',
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
    status: 'sent',
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
  {
    id: '6',
    spotId: 'E02',
    plateNumber: 'ش ص ض ١١١١',
    violationType: 'tilted',
    timestamp: new Date(Date.now() - 1000 * 60 * 75),
    status: 'paid',
    fineAmount: 150,
    location: { lat: 24.7155, lng: 46.6775 },
  },
  {
    id: '7',
    spotId: 'F08',
    plateNumber: 'ط ظ ع ٢٢٢٢',
    violationType: 'wrong_direction',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    status: 'sent',
    fineAmount: 150,
    location: { lat: 24.7160, lng: 46.6780 },
  },
];

// Riyadh neighborhoods and streets
export const riyadhLocations = [
  { neighborhood: 'العليا', street: 'طريق الملك فهد' },
  { neighborhood: 'العليا', street: 'شارع العروبة' },
  { neighborhood: 'العليا', street: 'شارع الأمير محمد بن عبدالعزيز' },
  { neighborhood: 'النخيل', street: 'شارع التخصصي' },
  { neighborhood: 'النخيل', street: 'طريق أنس بن مالك' },
  { neighborhood: 'النخيل', street: 'شارع الوادي' },
  { neighborhood: 'الربوة', street: 'شارع الأمير سلطان' },
  { neighborhood: 'الربوة', street: 'شارع الحسن بن الحسين' },
  { neighborhood: 'السليمانية', street: 'شارع العروبة' },
  { neighborhood: 'السليمانية', street: 'شارع الأمير عبدالله' },
  { neighborhood: 'الملز', street: 'شارع صلاح الدين' },
  { neighborhood: 'الملز', street: 'شارع جرير' },
  { neighborhood: 'المروج', street: 'طريق أنس بن مالك' },
  { neighborhood: 'المروج', street: 'شارع الإمام الشافعي' },
  { neighborhood: 'الورود', street: 'شارع الضباب' },
  { neighborhood: 'الورود', street: 'شارع موسى بن نصير' },
  { neighborhood: 'الصحافة', street: 'طريق الثمامة' },
  { neighborhood: 'الصحافة', street: 'شارع العليا' },
  { neighborhood: 'الياسمين', street: 'شارع سعود بن عبدالعزيز' },
  { neighborhood: 'الياسمين', street: 'طريق الملك سلمان' },
  { neighborhood: 'حطين', street: 'شارع التحلية' },
  { neighborhood: 'حطين', street: 'طريق الأمير محمد بن سعد' },
  { neighborhood: 'الغدير', street: 'شارع الإمام أحمد' },
  { neighborhood: 'الغدير', street: 'شارع أبو بكر الصديق' },
  { neighborhood: 'النرجس', street: 'طريق الملك سلمان' },
  { neighborhood: 'النرجس', street: 'شارع الأمير تركي' },
  { neighborhood: 'الملقا', street: 'طريق أنس بن مالك' },
  { neighborhood: 'الملقا', street: 'شارع عثمان بن عفان' },
  { neighborhood: 'العقيق', street: 'طريق الملك خالد' },
  { neighborhood: 'العقيق', street: 'شارع الشيخ محمد بن عثيمين' },
  { neighborhood: 'الرائد', street: 'شارع المعذر' },
  { neighborhood: 'الرائد', street: 'طريق الملك عبدالعزيز' },
  { neighborhood: 'الصفا', street: 'شارع الستين' },
  { neighborhood: 'الصفا', street: 'شارع الأمير مشعل' },
  { neighborhood: 'المحمدية', street: 'طريق خريص' },
  { neighborhood: 'المحمدية', street: 'شارع الشيخ حسن' },
  { neighborhood: 'الروضة', street: 'شارع الأمير سعود الفيصل' },
  { neighborhood: 'الروضة', street: 'شارع عبدالرحمن الغافقي' },
  { neighborhood: 'النسيم', street: 'طريق الدمام' },
  { neighborhood: 'النسيم', street: 'شارع سعد بن أبي وقاص' },
];

const zones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const mockParkingSpots: ParkingSpot[] = [];

// Generate 55 parking spots
for (let i = 0; i < 55; i++) {
  const zone = zones[Math.floor(i / 7) % zones.length];
  const spotNum = (i % 7) + 1;
  const location = riyadhLocations[i % riyadhLocations.length];
  const statusRandom = Math.random();
  let status: 'available' | 'occupied' | 'violation';
  if (statusRandom < 0.35) {
    status = 'available';
  } else if (statusRandom < 0.9) {
    status = 'occupied';
  } else {
    status = 'violation';
  }
  
  mockParkingSpots.push({
    id: `${zone}${String(spotNum).padStart(2, '0')}`,
    status,
    location: { 
      lat: 24.7100 + (i * 0.001), 
      lng: 46.6700 + (i * 0.0008) 
    },
    zone,
    neighborhood: location.neighborhood,
    street: location.street,
  });
}
