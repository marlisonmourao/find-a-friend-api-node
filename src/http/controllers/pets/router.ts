import type { FastifyInstance } from 'fastify'
import { registerPetController } from './register-pet.controller'

export async function organizationRouter(app: FastifyInstance) {
  app.register(registerPetController)
}
