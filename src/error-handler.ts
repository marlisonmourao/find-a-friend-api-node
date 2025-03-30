import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { CredentialsError } from './domain/use-cases/errors/credentials-error'
import { ResourceAlreadyExistsError } from './domain/use-cases/errors/resource-already-exists-error'
import { ResourceNotFoundError } from './domain/use-cases/errors/resource-not-found-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', error: error.flatten().fieldErrors })
  }

  if (error.code === 'FST_ERR_VALIDATION') {
    return reply
      .status(400)
      .send({ message: 'Validation error', error: error.validation })
  }

  if (error instanceof CredentialsError) {
    return reply.status(401).send({ message: error.message })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error instanceof ResourceAlreadyExistsError) {
    return reply.status(409).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
