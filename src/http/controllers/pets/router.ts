import type { FastifyInstance } from 'fastify'
import { getPetByIdController } from './get-pet-by-id.controller'
import { registerPetController } from './register-pet.controller'

export async function petsRouter(app: FastifyInstance) {
  app.register(registerPetController)
  app.register(getPetByIdController)
}
