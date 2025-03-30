import { app } from '@/app'
import { makeOrganization } from '@/factories/make-organization'
import request from 'supertest'

describe('Register pet controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const createOrganization = await makeOrganization()

    const authResult = await request(app.server).post('/auth/org').send({
      email: 'test@email.com',
      password: '12345678',
    })

    const { token } = authResult.body

    const result = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet Name',
        age: 'ADULT',
        size: 'SMALL',
        description: 'Pet Description',
        energyLevel: 1,
        independenceLevel: 'LOW',
        environment: 'INDOOR',
        type: 'DOG',
        available: true,
        city: 'Sample City',
        organizationId: createOrganization.id,
      })

    expect(result.statusCode).toEqual(201)
  })
})
