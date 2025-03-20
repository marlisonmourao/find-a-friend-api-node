import { PrismaPetsRepository } from '@/domain/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet-use-case'

export function makeCreatePet() {
  const petRepository = new PrismaPetsRepository()

  return new RegisterPetUseCase(petRepository)
}
