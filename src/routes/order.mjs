import { Router } from 'express'
import AppError from '../errors/AppError.mjs'
import { validate as isValidUUID } from 'uuid'
import AuthError from '../errors/AuthError.mjs'
import ValidationError from '../errors/ValidationError.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import OrderService from '../services/OrderService.js'
import { PrismaClient } from '../services/prisma.mjs'
import UserService from '../services/UserService.mjs'
import { storeOrderSchema } from '../services/validation.mjs'

const prisma = new PrismaClient()
const router = new Router()

const userService = new UserService(prisma.user)
const orderService = new OrderService(prisma.order, prisma.product)

router.post('/', async (req, res, next) => {
  const customerInfo = await storeOrderSchema.validate(req.body)

  if (req.cart.length === 0) {
    return next(new AppError('The cart is empty', 400))
  }

  // Create/find user and create order
  const user = await userService.findOrCreateUser(
    customerInfo.email,
    customerInfo.name,
  )

  // Create order
  const order = await orderService.createOrder(user.id, req.cart)

  return JsonResponse.from(req)
    .withStatus(201)
    .withData(order)
    .withJwtPayload({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Remove cart
    })
    .send(res)
})

router.get('/:orderId', async (req, res, next) => {
  if (!isValidUUID(req.params.orderId)) {
    return next(
      new ValidationError({
        orderId: 'orderId must be a valid UUID',
      }),
    )
  }

  if (!req.user) {
    return next(
      AuthError.unauthenticated('You must be logged in to access this route'),
    )
  }

  const order = await orderService.findOrderById(req.params.orderId, true)

  if (order?.userId !== req.user.id) {
    return next(AuthError.forbidden('You are not allowed to view this order'))
  }

  return JsonResponse.from(req).withData(order).send(res)
})

export default router
