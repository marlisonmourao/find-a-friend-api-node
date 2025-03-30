import { prisma } from '@/lib/prisma'
import type { Organization } from '@prisma/client'
import bcryptjs from 'bcryptjs'

export async function makeOrganization(overrides: Partial<Organization> = {}) {
  const createOrganization = await prisma.organization.create({
    data: {
      name: 'Organization Name',
      email: 'test@email.com',
      password: await bcryptjs.hash('12345678', 8),
      description: 'Organization Description',
      ...overrides,
    },
  })

  return createOrganization
}
