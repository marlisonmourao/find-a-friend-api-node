type AGE = 'Puppy' | 'ADULT' | 'SENIOR'
type SIZE = 'SMALL' | 'MEDIUM' | 'LARGE'
type INDEPENDENCE_lEVEL = 'LOW' | 'MEDIUM' | 'HIGH'
type PET_TYPE = 'CAT' | 'DOG' | 'OTHER'

export interface Pet {
  id: string
  name: string
  age?: AGE | null
  energyLevel: number
  size?: SIZE | null
  independenceLevel: INDEPENDENCE_lEVEL
  type: PET_TYPE
  orgId: string
  city: string
  available: boolean
  description?: string | null
  createdAt: Date
  updatedAt?: Date | null
}
