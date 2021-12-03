export type Uuid = string

export interface Entity {
  id: Uuid
}

export interface CartItem {
  productId: Uuid
  quantity: number
}

export interface User extends Entity {
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

export interface Product extends Entity {
  name: string
  description: string
  price: number
  imageId: Uuid
}
