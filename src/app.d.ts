import type { Request, Response } from 'express';
import User from './dto/User';

type Uuid = string;

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
