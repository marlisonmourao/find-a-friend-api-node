import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city-use-case'

let inMemoryPetRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

beforeEach(() => {
  inMemoryPetRepository = new InMemoryPetsRepository()
  sut = new FetchPetsByCityUseCase(inMemoryPetRepository)
})

describe('Fetch Pets By City Use Case', async () => {
  it('should be able to fetch pets by city', async () => {
    await inMemoryPetRepository.create({
      id: 'pet-1',
      name: 'Pet 1',
      age: 'ADULT',
      city: 'City 1',
      description: 'Description 1',
      type: 'DOG',
      available: true,
      energyLevel: 1,
      organizationId: 'org-1',
      independenceLevel: 'HIGH',
      size: 'MEDIUM',
    })
    await inMemoryPetRepository.create({
      id: 'pet-2',
      name: 'Pet 2',
      age: 'PUPPY',
      city: 'City 2',
      description: 'Description 2',
      type: 'CAT',
      available: true,
      energyLevel: 1,
      organizationId: 'org-1',
      independenceLevel: 'HIGH',
      size: 'SMALL',
    })

    const { pets } = await sut.execute({ city: 'City 1' })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Pet 1')
  })
})
