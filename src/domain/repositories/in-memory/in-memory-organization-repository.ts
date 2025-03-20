import type { Organization } from '@/domain/entities/organization'
import type { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  private items: Organization[] = []

  async create(data: Organization) {
    const organization = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find(org => org.email === email)

    if (!organization) {
      return null
    }
    return organization
  }

  async findById(id: string) {
    const organization = this.items.find(org => org.id === id)

    if (!organization) {
      return null
    }
    return organization
  }
}
