import type { FastifyInstance } from 'fastify'
import { registerOrganizationController } from './register-organization.controller'

export async function organizationRouter(app: FastifyInstance) {
  app.register(registerOrganizationController)
}
