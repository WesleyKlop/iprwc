import express from 'express'
import logger from 'morgan'
import auth from './middleware/auth.mjs'

import mainRouter from './routes/index.mjs'
import userRouter from './routes/users.mjs'
import cartRouter from './routes/cart.mjs'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(auth)

app.use('/', mainRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)

export default app
