import { PrismaOrganizationRepository } from '@/domain/repositories/prisma/prisma-organization-repository'
import { CreateOrganizationUseCase } from '../create-organization-use-case'

export function makeCreateOrganization() {
  const organizationRepository = new PrismaOrganizationRepository()
  return new CreateOrganizationUseCase(organizationRepository)
}
