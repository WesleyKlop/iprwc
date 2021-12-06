import express from 'express'

import applyMiddleware from './middleware/index.mjs'
import applyRouters from './routes/index.mjs'

const app = express()

applyMiddleware(app)
applyRouters(app)

export default app
