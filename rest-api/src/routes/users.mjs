import { Router } from 'express'
import AppError from '../errors/AppError.mjs'
import AuthError from '../errors/AuthError.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import UserService from '../services/UserService.mjs'
import { loginSchema } from '../services/validation.mjs'
import prisma from '../services/prisma.mjs'

const router = new Router()
const userService = new UserService(prisma.user)

router.get('/me', (req, res, next) => {
  if (!req.user) {
    return next(new AppError('You are not authenticated.', 401))
  }
  return JsonResponse.from(req).withData(req.user).send(res)
})

router.post('/login', async (req, res, next) => {
  const credentials = await loginSchema.validate(req.body)

  const user = await userService.attempt(credentials)
  if (!user) {
    return next(AuthError.unauthenticated('Invalid credentials.'))
  }

  return JsonResponse.from(req)
    .withJwtPayload({
      cart: req.cart.length > 0 ? req.cart : undefined,
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
    .withData(user)
    .send(res)
})

export default router
