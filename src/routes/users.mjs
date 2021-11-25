import { Router } from 'express'
import JsonResponse from '../http/JsonResponse.mjs'

const router = new Router()

router.get('/me', (req, res) => {
  return JsonResponse.from(req).withData(req.user).send(res)
})

export default router
