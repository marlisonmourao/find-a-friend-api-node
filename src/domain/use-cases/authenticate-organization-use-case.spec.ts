import bcryptjs from 'bcryptjs'
import { InMemoryOrganizationRepository } from '../repositories/in-memory/in-memory-organization-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization-use-case'
import { CredentialsError } from './errors/credentials-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

beforeEach(() => {
  inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
  sut = new AuthenticateOrganizationUseCase(inMemoryOrganizationRepository)
})

describe('Authenticate organization use case', () => {
  it('should be able to authenticate an organization', async () => {
    await inMemoryOrganizationRepository.create({
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      email: 'any_email',
      password: await bcryptjs.hash('123456', 8),
      createdAt: new Date(),
    })

    const { organization } = await sut.execute({
      email: 'any_email',
      password: '123456',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'any_name',
      })
    )
  })

  it('should not be able to authenticate an organization with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong_email',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(CredentialsError)
  })

  it('should not be able to authenticate an organization with wrong password', async () => {
    await inMemoryOrganizationRepository.create({
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      email: 'any_email',
      password: await bcryptjs.hash('123456', 8),
      createdAt: new Date(),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong_email',
        password: '1234565',
      })
    ).rejects.toBeInstanceOf(CredentialsError)
  })
})
