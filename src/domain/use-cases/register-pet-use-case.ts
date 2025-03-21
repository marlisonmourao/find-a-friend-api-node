import { randomUUID } from 'node:crypto'
import type { Pet } from '../entities/pet'
import type { PetsRepository } from '../repositories/pets-repository'

interface RegisterPetUseCaseRequest extends Omit<Pet, 'id' | 'createdAt'> {}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute(
    data: RegisterPetUseCaseRequest
  ): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    })

    return { pet }
  }
}
