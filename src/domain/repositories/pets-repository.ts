import type { Pet } from '@/domain/entities/pet'

export interface PetsRepository {
  create(data: Pet): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
}
