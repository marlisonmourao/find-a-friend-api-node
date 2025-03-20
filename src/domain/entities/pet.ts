type Age = 'puppy' | 'adult' | 'senior'
type Size = 'small' | 'medium' | 'large'
type IndependenceLevel = 'low' | 'medium' | 'high'

export interface Pet {
  id: string
  name: string
  age?: Age | null
  energyLevel: number
  size?: Size | null
  independenceLevel: IndependenceLevel
  type: 'cat' | 'dog' | 'other'
  orgId: string
  city: string
  available: boolean
  description?: string | null
  createdAt: Date
  updatedAt?: Date | null
}
