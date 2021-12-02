import { Router } from 'express'
import NotFoundError from '../errors/NotFoundError.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import { admin } from '../middleware/guards.mjs'
import { PrismaClient } from '../services/prisma.mjs'

const prisma = new PrismaClient()
const router = new Router()

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany()

  return JsonResponse.from(req).withData(products).send(res)
})

router.post('/', [admin], async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    },
  })

  return JsonResponse.from(req).withData(product).send(res)
})

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (product === null) {
    return next(new NotFoundError('Product', productId))
  }

  return JsonResponse.from(req).withData(product).send(res)
})

export default router
