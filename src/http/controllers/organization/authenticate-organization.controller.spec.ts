import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import request from 'supertest'

describe('Authenticate Organization Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to authenticate an organization', async () => {
    await prisma.organization.create({
      data: {
        name: 'Organization Name',
        email: 'test@email.com',
        password: await bcryptjs.hash('12345678', 8),
        description: 'Organization Description',
      },
    })

    const result = await request(app.server).post('/auth/org').send({
      email: 'test@email.com',
      password: '12345678',
    })

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      token: expect.any(String),
    })
  })
})
