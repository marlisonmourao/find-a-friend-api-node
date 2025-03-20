import { prisma } from '@/lib/prisma'
import type { Organization } from '@prisma/client'
import type { OrganizationRepository } from '../organization-repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Organization): Promise<Organization> {
    const createdOrganization = await prisma.organization.create({
      data,
    })

    return createdOrganization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { id },
    })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })

    return organization
  }
}
