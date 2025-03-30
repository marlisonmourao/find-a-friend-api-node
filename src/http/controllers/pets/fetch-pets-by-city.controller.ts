import { makeFetchPetsByCity } from '@/domain/use-cases/factories/make-fetch-pets-by-city'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function fetchPetsByCityController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/pets/city/:city',
    {
      schema: {
        tags: ['Pets'],
        summary: 'Fetch pets by city',
        description: 'Get a list of pets available in a specific city',
        params: z.object({
          city: z.string(),
        }),
        response: {
          200: z.object({
            pets: z.array(
              z.object({
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
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { city } = request.params

      const fetchPetsByCity = makeFetchPetsByCity()
      const { pets } = await fetchPetsByCity.execute({ city })

      return { pets }
    }
  )
}
