import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetByIdUseCase } from './get-pet-by-id-use-case'

describe('Get pet by id use case', () => {
  let inMemoryPetRepository: InMemoryPetsRepository
  let sut: GetPetByIdUseCase

  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(inMemoryPetRepository)
  })

  it('should be able to get pet by id', async () => {
    const createdPet = await inMemoryPetRepository.create({
      id: 'pet-1',
      name: 'Dog',
      age: 'ADULT',
      available: true,
      energyLevel: 2,
      city: 'São Paulo',
      independenceLevel: 'LOW',
      organizationId: 'org-1',
      size: 'MEDIUM',
      type: 'DOG',
      description: 'Dog description',
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual('pet-1')
    expect(pet.name).toEqual('Dog')
  })

  it('should not be able to get pet by id if pet does not exist', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-pet-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
