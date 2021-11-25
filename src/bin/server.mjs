#!/usr/bin/env node
import debugFactory from 'debug'
import http from 'http'
import app from '../app.mjs'

/**
 * Module dependencies.
 */

const debug = debugFactory('webshop-rest-api:server')

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000'
app.set('port', port)
const server = http.createServer(app)

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})

server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
})
