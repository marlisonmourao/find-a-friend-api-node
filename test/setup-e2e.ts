import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

function generateUrlDatabase(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

const databaseURL = generateUrlDatabase(schemaId)
process.env.DATABASE_URL = databaseURL

beforeAll(() => {
  prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaId}"`)

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
