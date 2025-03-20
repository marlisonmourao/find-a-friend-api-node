import { randomUUID } from 'node:crypto'
import type { Organization } from '../entities/organization'
import type { OrganizationRepository } from '../repositories/organization-repository'

import bcryptjs from 'bcryptjs'

interface CreateOrganizationUseCaseRequest extends Omit<Organization, 'id'> {}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(
    data: CreateOrganizationUseCaseRequest
  ): Promise<CreateOrganizationUseCaseResponse> {
    const passwordHashed = await bcryptjs.hash(data.password, 8)

    const organization = await this.organizationRepository.create({
      ...data,
      id: randomUUID(),
      password: passwordHashed,
    })

    return { organization }
  }
}
