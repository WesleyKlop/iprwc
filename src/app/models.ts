export type Uuid = string

export interface Entity {
  id: Uuid
}

export interface CartItem {
  productId: Uuid
  quantity: number
}

export interface Product extends Entity {
  name: string
  description: string
  price: number
}
