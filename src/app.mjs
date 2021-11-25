import express from 'express'
import logger from 'morgan'

import mainRouter from './routes/index.mjs'
import userRouter from './routes/users.mjs'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', mainRouter)
app.use('/users', userRouter)

export default app
