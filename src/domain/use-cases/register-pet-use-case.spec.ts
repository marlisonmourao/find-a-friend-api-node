import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet-use-case'

let inMemoryPetRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

beforeEach(() => {
  inMemoryPetRepository = new InMemoryPetsRepository()
  sut = new RegisterPetUseCase(inMemoryPetRepository)
})

describe('Register pet use case', () => {
  it('should be able to register a new pet', async () => {
    const result = await sut.execute({
      name: 'Dog',
      age: 'ADULT',
      available: true,
      energyLevel: 2,
      city: 'São Paulo',
      independenceLevel: 'LOW',
      size: 'MEDIUM',
      type: 'DOG',
      description: 'Dog description',
      organizationId: 'org-1',
    })

    expect(inMemoryPetRepository.items).toHaveLength(1)
    expect(result.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })
})
