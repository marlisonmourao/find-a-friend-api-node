import { prisma } from '@/lib/prisma'
import type { Pet, Prisma } from '@prisma/client'

export async function makePet(
  orgId: string,
  override: Partial<Prisma.PetUncheckedCreateInput> = {}
): Promise<Pet> {
  const pet = await prisma.pet.create({
    data: {
      name: 'John Dog',
      age: 'ADULT',
      size: 'MEDIUM',
      description: 'A friendly dog',
      energyLevel: 4,
      independenceLevel: 'HIGH',
      type: 'DOG',
      available: true,
      city: 'Test City',
      organizationId: orgId,
      ...override,
    },
  })

  return pet
}
