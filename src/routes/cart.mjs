import { Router } from 'express'
import JsonResponse from '../http/JsonResponse.mjs'
import {
  addProductToCartSchema,
  modifyProductCartSchema,
} from '../validation.mjs'

const router = new Router()

router.get('/', (req, res) => {
  // Return all cart items contained in the jwt
  return JsonResponse.from(req)
    .withData(req.cart || [])
    .send(res)
})

router.post('/', async (req, res) => {
  const data = await addProductToCartSchema.validate(req.body)

  // Increment quantity or add to cart
  const product = req.cart.find((p) => p.productId === data.productId)

  if (product) {
    product.quantity = data.quantity
  } else {
    req.cart.push(data)
  }

  return JsonResponse.from(req)
    .withData(req.cart)
    .withJwtPayload({
      ...req.jwtPayload,
      // Add the new cart data to the jwt.
      cart: req.cart,
    })
    .send(res)
})

router.patch('/', async (req, res) => {
  const data = await modifyProductCartSchema.validate(req.body)

  // Increment quantity or add to cart
  const product = req.cart.find((p) => p.productId === data.productId)

  if (product) {
    product.quantity += data.quantity
  } else {
    req.cart.push(data)
  }

  return JsonResponse.from(req)
    .withData(product)
    .withJwtPayload({
      ...req.jwtPayload,
      // Add the new cart data to the jwt.
      cart: req.cart,
    })
    .send(res)
})

export default router
