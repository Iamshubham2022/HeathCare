export type RiskLevel = 'low' | 'medium' | 'high'

export type Patient = {
  id: string
  name: string
  age: number
  gender: 'Female' | 'Male' | 'Other'
  condition: string
  riskLevel: RiskLevel
  lastVisit: string // ISO date
  nextAppointmentInDays: number
  phone: string
  email: string
  address: string
}

export const seedPatients: Patient[] = [
  {
    id: 'pt-1001',
    name: 'Aarav Mehta',
    age: 52,
    gender: 'Male',
    condition: 'Type 2 Diabetes',
    riskLevel: 'medium',
    lastVisit: '2026-04-08',
    nextAppointmentInDays: 5,
    phone: '+91 98765 43210',
    email: 'aarav.mehta@example.com',
    address: 'Pune, Maharashtra',
  },
  {
    id: 'pt-1002',
    name: 'Sara Fernandes',
    age: 34,
    gender: 'Female',
    condition: 'Asthma',
    riskLevel: 'low',
    lastVisit: '2026-03-26',
    nextAppointmentInDays: 18,
    phone: '+91 91234 56789',
    email: 'sara.fernandes@example.com',
    address: 'Bengaluru, Karnataka',
  },
  {
    id: 'pt-1003',
    name: 'Kabir Singh',
    age: 61,
    gender: 'Male',
    condition: 'Hypertension',
    riskLevel: 'high',
    lastVisit: '2026-04-21',
    nextAppointmentInDays: 2,
    phone: '+91 99887 77665',
    email: 'kabir.singh@example.com',
    address: 'Delhi',
  },
  {
    id: 'pt-1004',
    name: 'Nisha Iyer',
    age: 45,
    gender: 'Female',
    condition: 'Chronic Kidney Disease',
    riskLevel: 'high',
    lastVisit: '2026-04-18',
    nextAppointmentInDays: 6,
    phone: '+91 90909 10101',
    email: 'nisha.iyer@example.com',
    address: 'Chennai, Tamil Nadu',
  },
  {
    id: 'pt-1005',
    name: 'Rohan Shah',
    age: 28,
    gender: 'Male',
    condition: 'Seasonal Allergies',
    riskLevel: 'low',
    lastVisit: '2026-04-02',
    nextAppointmentInDays: 24,
    phone: '+91 90000 12345',
    email: 'rohan.shah@example.com',
    address: 'Ahmedabad, Gujarat',
  },
  {
    id: 'pt-1006',
    name: 'Fatima Khan',
    age: 39,
    gender: 'Female',
    condition: 'Migraine',
    riskLevel: 'medium',
    lastVisit: '2026-04-10',
    nextAppointmentInDays: 9,
    phone: '+91 98989 11122',
    email: 'fatima.khan@example.com',
    address: 'Mumbai, Maharashtra',
  },
]

