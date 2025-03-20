import { makeAuthenticateOrganization } from '@/domain/use-cases/factories/make-authenticate-organization'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function authenticateOrganization(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/org',
    {
      schema: {
        tags: ['Organization'],
        summary: 'Authenticate organization',
        description: 'Authenticate organization',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const authenticateOrganization = makeAuthenticateOrganization()

      const { organization } = await authenticateOrganization.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: { sub: organization.id },
        }
      )

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: organization.id,
            expiresIn: '7d',
          },
        }
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({
          token,
        })
    }
  )
}
