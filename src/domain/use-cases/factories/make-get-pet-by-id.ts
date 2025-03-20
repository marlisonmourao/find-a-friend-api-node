import { PrismaPetsRepository } from '@/domain/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id-use-case'

export function makeGetPetById() {
  const petRepository = new PrismaPetsRepository()

  return new GetPetByIdUseCase(petRepository)
}
