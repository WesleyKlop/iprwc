import { Router } from 'express'
import AppError from '../errors/AppError.mjs'
import AuthError from '../errors/AuthError.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import OrderService from '../services/OrderService.js'
import UserService from '../services/UserService.mjs'
import { getOrderSchema, storeOrderSchema } from '../services/validation.mjs'
import prisma from '../services/prisma.mjs'
import { formatEmail, sendMail } from '../services/mailer.mjs'
import { createToken } from '../services/jwt.mjs'
import { normalizePostalCode } from '../services/utils.mjs'
import { authenticated } from '../middleware/guards.mjs'

const router = new Router()

const userService = new UserService(prisma.user)
const orderService = new OrderService(prisma.order, prisma.product)

router.get('/', authenticated, async (req, res, next) => {
  const orders = await orderService.findOrdersByUser(req.user.id)

  return JsonResponse.from(req).withData(orders).send(res)
})

router.post('/', async (req, res, next) => {
  const orderInfo = await storeOrderSchema.validate(req.body)

  if (req.cart.length === 0) {
    return next(new AppError('The cart is empty', 400))
  }

  // Create/find user and create order
  const user = await userService.findOrCreateUser(
    orderInfo.email,
    orderInfo.name,
  )

  // Create order
  const order = await orderService.createOrder(
    {
      userId: user.id,
      city: orderInfo.city,
      postalCode: normalizePostalCode(orderInfo.postalCode),
      street: orderInfo.street,
      paymentMethod: orderInfo.paymentMethod,
    },
    req.cart,
  )

  // Send an email to the user.
  const token = await createToken({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    cart: [],
  })
  const orderUrl = new URL('/orders', process.env.APP_URL)
  orderUrl.searchParams.set('token', token)
  const body = `
  Je bestelling is geplaatst.

  Gebruik de volgende link om in te loggen en je bestelling te bekijken:
  __URL__
  `
    .trim()
    .replace('__URL__', orderUrl.toString())
  await sendMail(formatEmail(user), 'Bestel bevestiging', body)

  return JsonResponse.from(req)
    .withStatus(201)
    .withData(order)
    .withJwtPayload({
      ...req.jwtPayload,
      // Remove cart
      cart: [],
    })
    .send(res)
})

router.get('/:orderId', async (req, res, next) => {
  const { orderId } = await getOrderSchema.validate(req.params)

  if (!req.user) {
    return next(
      AuthError.unauthenticated('You must be logged in to access this route'),
    )
  }

  const order = await orderService.findOrderById(orderId, true)

  if (order?.userId !== req.user.id && !req.user.isAdmin()) {
    return next(AuthError.forbidden('You are not allowed to view this order'))
  }

  return JsonResponse.from(req).withData(order).send(res)
})

export default router
