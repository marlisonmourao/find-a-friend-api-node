import { PrismaOrganizationRepository } from '@/domain/repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-organization-use-case'

export function makeAuthenticateOrganization() {
  const organizationRepository = new PrismaOrganizationRepository()

  return new AuthenticateOrganizationUseCase(organizationRepository)
}
