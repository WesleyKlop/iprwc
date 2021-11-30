import type { Request, Response } from 'express'

type Uuid = string
type Role = 'ADMIN' | 'USER'

declare class User {
  id: Uuid
  name: string
  email: string
  role: Role

  constructor(id: Uuid, name: string, email: string,  role: Role)

  isAdmin(): this extends { role: 'ADMIN' } ? true : false
}


interface JwtPayload {
  cart: Array<CartItem>

  sub?: Uuid
  name?: string
  email?: string
  role?: string
}

interface AppRequest extends Request {
  cart: Array<CartItem>

  user?: User
  jwt?: string
  jwtPayload?: JwtPayload
}

interface AppResponse extends Response {
}

interface CartItem {
  productId: Uuid
  quantity: number
}
