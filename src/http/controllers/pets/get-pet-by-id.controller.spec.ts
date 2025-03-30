import { app } from '@/app'
import { makeOrganization } from '@/factories/make-organization'
import { makePet } from '@/factories/make-pet'
import request from 'supertest'

describe('Get Pet By Id Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const organization = await makeOrganization()
    const pet = await makePet(organization.id, {
      name: 'Test Pet',
      age: 'ADULT',
      size: 'SMALL',
      description: 'Test Description',
      energyLevel: 1,
      independenceLevel: 'LOW',
    })

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: 'Test Pet',
        age: 'ADULT',
        size: 'SMALL',
      })
    )
  })
})
