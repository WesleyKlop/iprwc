import ErrorResponse from '../http/ErrorResponse.mjs'
import cartRouter from './cart.mjs'
import productRouter from './products.mjs'
import userRouter from './users.mjs'

export default (app) => {
  app.use('/users', userRouter)
  app.use('/products', productRouter)
  app.use('/cart', cartRouter)

  app.use((err, req, res, next) => ErrorResponse.from(req, err).send(res))
}
