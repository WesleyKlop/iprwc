import express from 'express'
import logger from 'morgan'
import auth from './auth.mjs'
import injector from './injector.mjs'

export default (app) => {
  // Request logging middleware.
  app.use(logger('dev'))
  // Handle json body parsing.
  app.use(express.json())
  // Handle urlencoded body parsing.
  app.use(express.urlencoded({ extended: false }))
  // Handle JWT authentication.
  app.use(auth)
  // Inject discovered values into the request.
  app.use(injector)
}
