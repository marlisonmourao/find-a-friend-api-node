import { randomUUID } from 'node:crypto'
import type { Organization } from '../entities/organization'
import type { OrganizationRepository } from '../repositories/organization-repository'

import bcryptjs from 'bcryptjs'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

interface CreateOrganizationUseCaseRequest extends Omit<Organization, 'id'> {}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(
    data: CreateOrganizationUseCaseRequest
  ): Promise<CreateOrganizationUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(data.email)

    if (organizationWithSameEmail) {
      throw new ResourceAlreadyExistsError()
    }

    const passwordHashed = await bcryptjs.hash(data.password, 8)

    const organization = await this.organizationRepository.create({
      ...data,
      id: randomUUID(),
      password: passwordHashed,
    })

    return { organization }
  }
}
