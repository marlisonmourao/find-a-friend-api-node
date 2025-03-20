import { prisma } from '@/lib/prisma'
import type { Pet } from '@prisma/client'
import type { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Pet): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: { city },
    })

    return pets
  }
}
