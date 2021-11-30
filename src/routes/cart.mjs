import { Router } from 'express'
import AppError from '../errors/AppError.mjs'
import NotFoundError from '../errors/NotFoundError.mjs'
import ErrorResponse from '../http/ErrorResponse.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import {
  addProductToCartSchema,
  patchProductCartSchema,
} from '../services/validation.mjs'

const router = new Router()

router.get('/', (req, res) => {
  if (!req.jwt) {
    throw new AppError('You do not have a cart yet!', 404)
  }
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

/**
 * Add or subtract a product from the cart.
 */
router.patch('/', async (req, res) => {
  const data = await patchProductCartSchema.validate(req.body)

  // Increment quantity or add to cart
  const product = req.cart.find((p) => p.productId === data.productId)

  if (product) {
    product.quantity += data.quantity
  } else if (data.quantity > 0) {
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

/**
 * Empty the shopping cart.
 */
router.delete('/', async (req, res) => {
  return JsonResponse.from(req)
    .withData([])
    .withJwtPayload({
      ...req.jwtPayload,
      // Add the new cart data to the jwt.
      cart: [],
    })
    .send(res)
})

export default router
