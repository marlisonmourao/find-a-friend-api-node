import { InMemoryOrganizationRepository } from '../repositories/in-memory/in-memory-organization-repository'
import { CreateOrganizationUseCase } from './create-organization-use-case'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
  sut = new CreateOrganizationUseCase(inMemoryOrganizationRepository)
})

describe('Create organization use case', () => {
  it('should be able to create an organization', async () => {
    const { organization } = await sut.execute({
      name: 'any_name',
      description: 'any_description',
      email: 'any_email',
      password: 'any_password',
      createdAt: new Date(),
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'any_name',
      })
    )
  })
})
