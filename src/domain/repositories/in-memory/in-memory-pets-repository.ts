import type { Pet } from '@/domain/entities/pet'
import type { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Omit<Pet, 'createdAt'>) {
    const pet = {
      ...data,
      id: data.id ?? crypto.randomUUID(),
      createdAt: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string) {
    const pets = this.items.filter(item => item.city === city)

    return pets
  }
}
