import { app } from '@/app'

import request from 'supertest'

describe('Register Organization Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to register an organization', async () => {
    const result = await request(app.server).post('/organization').send({
      name: 'Organization Name',
      email: 'test@email.com',
      password: '12345678',
      description: 'Organization Description',
    })

    expect(result.statusCode).toEqual(201)
  })
})
