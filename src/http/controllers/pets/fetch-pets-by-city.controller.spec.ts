import { app } from '@/app'
import { makeOrganization } from '@/factories/make-organization'
import { makePet } from '@/factories/make-pet'
import request from 'supertest'

describe('Fetch Pets By City Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const organization = await makeOrganization()

    await makePet(organization.id, {
      city: 'São Paulo',
      name: 'Pet SP 1',
    })

    await makePet(organization.id, {
      city: 'São Paulo',
      name: 'Pet SP 2',
    })

    await makePet(organization.id, {
      city: 'Rio de Janeiro',
      name: 'Pet RJ',
    })

    const response = await request(app.server).get('/pets/city/São Paulo')

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: 'Pet SP 1' }),
      expect.objectContaining({ name: 'Pet SP 2' }),
    ])
  })
})
