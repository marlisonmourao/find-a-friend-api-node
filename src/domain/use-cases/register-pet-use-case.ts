import { randomUUID } from 'node:crypto'
import type { Pet } from '../entities/pet'
import type { PetsRepository } from '../repositories/pets-repository'

export class RegisterPetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute(data: Omit<Pet, 'id'>): Promise<Pet> {
    const pet = await this.petRepository.create({
      ...data,
      id: randomUUID(),
    })
    return pet
  }
}
