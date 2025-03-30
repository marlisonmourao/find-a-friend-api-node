import { makeGetPetById } from '@/domain/use-cases/factories/make-get-pet-by-id'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getPetByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/pets/:id',
    {
      schema: {
        tags: ['Pets'],
        summary: 'Get pet by ID',
        description: 'Get detailed information about a specific pet',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            pet: z.object({
              id: z.string(),
              name: z.string(),
              age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).nullish(),
              energyLevel: z.number(),
              size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
              independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
              type: z.enum(['CAT', 'DOG', 'OTHER']),
              organizationId: z.string(),
              city: z.string(),
              available: z.boolean(),
              description: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date().nullish(),
            }),
          }),
        },
      },
    },
    async request => {
      const { id } = request.params

      const getPetById = makeGetPetById()

      const { pet } = await getPetById.execute({ id })

      return {
        pet,
      }
    }
  )
}
