import { Router } from 'express'
import AppError from '../errors/AppError.mjs'
import JsonResponse from '../http/JsonResponse.mjs'

const router = new Router()

router.get('/me', (req, res, next) => {
  if (!req.user) {
    return next(new AppError('You are not authenticated.', 401))
  }
  return JsonResponse.from(req).withData(req.user).send(res)
})

export default router
