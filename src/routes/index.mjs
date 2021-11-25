import { Router } from 'express'
import { PrismaClient } from '../prisma.mjs'

const dbClient = new PrismaClient()
const router = new Router()

router.get('/', async (req, res, next) => {
  const users = await dbClient.user.findMany()
  res.json(users)
})

export default router
