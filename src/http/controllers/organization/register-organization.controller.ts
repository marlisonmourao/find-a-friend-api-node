import { makeRegisterOrganization } from '@/domain/use-cases/factories/make-register-organization'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function registerOrganizationController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/organization',
    {
      schema: {
        tags: ['Organization'],
        description: 'Register a new organization',
        summary: 'Register a new organization',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
          description: z.string(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, description } = request.body

      const registerOrganization = makeRegisterOrganization()

      await registerOrganization.execute({
        name,
        email,
        password,
        description,
      })

      return reply.status(201).send({})
    }
  )
}
