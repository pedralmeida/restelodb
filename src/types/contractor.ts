export type Specialty =
  | 'Canalização'
  | 'Eletricidade'
  | 'Carpintaria'
  | 'Pintura'
  | 'Jardinagem'
  | 'AVAC'
  | 'Faz-tudo Geral'
  | 'Outro'

export const SPECIALTIES: Specialty[] = [
  'Canalização',
  'Eletricidade',
  'Carpintaria',
  'Pintura',
  'Jardinagem',
  'AVAC',
  'Faz-tudo Geral',
  'Outro',
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
