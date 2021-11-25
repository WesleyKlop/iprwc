import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  // Return all cart items contained in the jwt
  res.json(req.cart)
})

export default router
