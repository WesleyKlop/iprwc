import { ValidationError as YupValidationError } from 'yup'
import AppError from '../errors/AppError.mjs'
import ValidationErrorResponse from '../http/ValidationErrorResponse.mjs'
import ErrorResponse from '../http/ErrorResponse.mjs'
import cartRouter from './cart.mjs'
import productRouter from './products.mjs'
import userRouter from './users.mjs'
import debugFactory from 'debug'
import orderRouter from './order.mjs'
import imageRouter from './images.mjs'
import WrappedError from '../errors/WrappedError.mjs'

const logger = debugFactory('backend:routes')

export default (app) => {
  app.use('/users', userRouter)
  app.use('/products', productRouter)
  app.use('/cart', cartRouter)
  app.use('/orders', orderRouter)
  app.use('/images', imageRouter)

  app.get('/health', (req, res) => {
    res.status(200).send('OK')
  })

  // Exception handler.
  app.use((err, req, res, next) => {
    logger(err)
    if (err instanceof YupValidationError) {
      return ValidationErrorResponse.from(req, err).send(res)
    }

    if (err instanceof AppError) {
      return ErrorResponse.from(req, err).send(res)
    }

    return ErrorResponse.from(req, new WrappedError(err)).send(res)
  })
}
