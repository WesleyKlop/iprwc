export type Uuid = string

export interface Entity {
  id: Uuid
}

export interface CartItem {
  productId: Uuid
  quantity: number
}

export interface CartProduct extends CartItem {
  product: Product
}
export interface Order extends Entity {}

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
  imageId: Uuid
}
