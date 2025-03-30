import type { FastifyInstance } from 'fastify'
import { registerPetController } from './register-pet.controller'

export async function petsRouter(app: FastifyInstance) {
  app.register(registerPetController)
}
