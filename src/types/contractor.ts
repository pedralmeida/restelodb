export type Specialty =
  | 'Plumbing'
  | 'Electrical'
  | 'Carpentry'
  | 'Painting'
  | 'Landscaping'
  | 'HVAC'
  | 'General Handyman'
  | 'Other'

export const SPECIALTIES: Specialty[] = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Painting',
  'Landscaping',
  'HVAC',
  'General Handyman',
  'Other',
]

export type Contractor = {
  id: string
  name: string
  phone: string
  specialty: Specialty
  notes?: string
  submittedAt: string
}

export type Review = {
  id: string
  contractorId: string
  comment: string
  rating: number
  createdAt: string
}
