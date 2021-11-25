import User from '../dto/User.js'

const injectUserIntoRequest = (req, tokenData) => {
  // We store data for guests in the jwt too. Those do not have a 'sub'.
  if (!tokenData || !('sub' in tokenData)) {
    req.user = undefined
    return
  }

  req.user = new User(
    tokenData.sub,
    tokenData.name,
    tokenData.email,
    tokenData.role,
  )
}

const injectCartIntoRequest = (req, tokenData) => {
  if (!tokenData || !('cart' in tokenData)) {
    req.cart = []
    return
  }

  req.cart = tokenData.cart
}

const middleware = async (req, res, next) => {
  injectUserIntoRequest(req, req.jwtPayload)
  injectCartIntoRequest(req, req.jwtPayload)
  next()
}

export default middleware
