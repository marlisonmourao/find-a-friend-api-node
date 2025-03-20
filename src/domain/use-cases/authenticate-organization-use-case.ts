import type { Organization } from '../entities/organization'
import type { OrganizationRepository } from '../repositories/organization-repository'
import { CredentialsError } from './errors/credentials-error'

import bcrypt from 'bcryptjs'

interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new CredentialsError('Invalid credentials')
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      organization.password
    )

    if (!isPasswordCorrect) {
      throw new CredentialsError('Invalid credentials')
    }

    return { organization }
  }
}
