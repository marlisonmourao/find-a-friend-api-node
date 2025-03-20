import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet-by-id-use-case'

let inMemoryPetRepository: InMemoryPetsRepository
let sut: GetPetByIdUseCase

beforeEach(() => {
  inMemoryPetRepository = new InMemoryPetsRepository()
  sut = new GetPetByIdUseCase(inMemoryPetRepository)
})

describe('Get pet by id use case', () => {
  it('should be able to get pet by id', async () => {
    const createPet = await inMemoryPetRepository.create({
      id: 'pet-1',
      name: 'Dog',
      age: 'adult',
      available: true,
      energyLevel: 2,
      city: 'São Paulo',
      independenceLevel: 'low',
      orgId: 'org-1',
      size: 'medium',
      type: 'dog',
      description: 'Dog description',
    })

    const { pet } = await sut.execute({
      id: createPet.id,
    })

    expect(pet.id).toEqual('pet-1')
    expect(pet.name).toEqual('Dog')
  })
})
