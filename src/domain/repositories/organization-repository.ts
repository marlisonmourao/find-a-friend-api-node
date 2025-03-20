import type { Organization } from '../entities/organization'

export interface OrganizationRepository {
  create(organization: Organization): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
