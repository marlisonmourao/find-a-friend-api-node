import { PrismaPetsRepository } from '@/domain/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city-use-case'

export function makeFetchPetsByCity() {
  const petRepository = new PrismaPetsRepository()

  return new FetchPetsByCityUseCase(petRepository)
}
