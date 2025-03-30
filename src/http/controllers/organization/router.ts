import type { FastifyInstance } from 'fastify'
import { authenticateOrganization } from './authenticate-organization.controller'
import { registerOrganizationController } from './register-organization.controller'

export async function organizationRouter(app: FastifyInstance) {
  app.register(registerOrganizationController)
  app.register(authenticateOrganization)
}
