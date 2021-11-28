import { Router } from 'express'
import ErrorResponse from '../http/ErrorResponse.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import { PrismaClient } from '../services/prisma.mjs'
import { storeOrderSchema } from '../services/validation.mjs'

const prisma = new PrismaClient()
const router = new Router()

router.post('/', async (req, res) => {
  const customerInfo = storeOrderSchema.validate(req.body)

  if (req.cart.length === 0) {
    return ErrorResponse.make(req).withStatus(400).send(res)
  }

  // Create/find user and create order
  const user = await prisma.user.findOne({
    where: {
      email: customerInfo.email,
    },
  })

  return JsonResponse.make(req).withStatus(201).send(res)
})
