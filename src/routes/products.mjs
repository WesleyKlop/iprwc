import { Router } from 'express'
import JsonResponse from '../http/JsonResponse.mjs'
import { PrismaClient } from '../services/prisma.mjs'

const prisma = new PrismaClient()
const router = new Router()

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany()

  return JsonResponse.from(req).withData(products).send(res)
})

export default router
