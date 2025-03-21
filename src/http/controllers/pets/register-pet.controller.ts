import { makeCreatePet } from '@/domain/use-cases/factories/make-register-pet'
import { verifyJWT } from '@/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function registerPetController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/pets',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Pets'],
        description: 'Register a new pet',
        summary: 'Register a new pet',
        body: z.object({
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
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const {
        name,
        age,
        energyLevel,
        size,
        independenceLevel,
        type,
        organizationId,
        city,
        available,
        description,
      } = request.body

      const registerPet = makeCreatePet()

      await registerPet.execute({
        name,
        age,
        energyLevel,
        size,
        independenceLevel,
        type,
        organizationId,
        city,
        available,
        description,
      })

      return reply.status(201).send({})
    }
  )
}
