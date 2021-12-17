export type Uuid = string

export interface Entity {
  id: Uuid
}

export interface CartItem {
  productId: Product['id']
  quantity: number
}

export interface CartProduct extends CartItem {
  product: Product
}

export interface OrderProduct extends Entity {
  orderId: Order['id']
  productId: Product['id']
  price: number
  quantity: number
}

export interface Order<T = string> extends Entity {
  city: string
  paymentMethod: string
  postalCode: string
  street: string
  createdAt: T

  userId: User['id']
  orderProducts: OrderProduct[]
}

export interface User extends Entity {
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

export interface Image extends Entity {
  mimeType: string
  path: string
  name: string
}

export interface Product extends Entity {
  name: string
  description: string
  price: number
  imageId: Image['id']
}
