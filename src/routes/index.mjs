import { Router } from 'express'
import { PrismaClient } from '../prisma.mjs'

const dbClient = new PrismaClient()

const router = Router()

router.get('/', async (req, res, next) => {
    const users = await dbClient.users.findMany()
    res.json(users)
})

export default router
