import ErrorResponse from '../http/ErrorResponse.mjs'
import cartRouter from './cart.mjs'
import productRouter from './products.mjs'
import userRouter from './users.mjs'
import debugFactory from 'debug'
import orderRouter from './order.mjs'

const logger = debugFactory('rest-api:routes')

export default (app) => {
  app.use('/users', userRouter)
  app.use('/products', productRouter)
  app.use('/cart', cartRouter)
  app.use('/orders', orderRouter)

  app.get('/health', (req, res) => {
    res.status(200).send('OK')
  })

  // Exception handler.
  app.use((err, req, res, next) => {
    logger(err)
    return ErrorResponse.from(req, err).send(res)
  })
}
