import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, map, Observable, of, switchMap } from 'rxjs'
import { CartItem, CartProduct, Product } from '../models'
import { addOrUpdate, getJwtPayload } from '../utils'
import { ProductService } from './product.service'
import { ApiService } from './api.service'

interface CreateOrderRequest {
  name: string
  email: string
  postalCode: string
  city: string
  street: string
  paymentMethod: string
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([])

  constructor(
    private apiService: ApiService,
    private productService: ProductService,
  ) {
    const savedToken = localStorage.getItem('app.jwt')
    if (savedToken) {
      const payload = getJwtPayload(savedToken)
      if (payload) this.cartItems.next(payload.cart)
    }
  }

  products(): Observable<CartProduct[]> {
    return this.cartItems.pipe(
      filter((items) => Array.isArray(items)),
      switchMap((items: CartItem[]) => {
        if (!items.length) {
          return of([])
        }
        return this.productService.fetchAllProducts().pipe(
          map((products) => {
            return items.map((item) => {
              const product = products.find(
                (product) => item.productId === product.id,
              )!
              return {
                productId: item.productId,
                quantity: item.quantity,
                product,
              }
            })
          }),
        )
      }),
    )
  }

  count(): Observable<number> {
    return this.cartItems.pipe(
      filter((items) => Array.isArray(items)),
      map((items) => items.reduce((acc, item) => acc + item.quantity, 0)),
    )
  }

  addToCart(id: Product['id']) {
    this.modifyCart(id, 1)
  }

  protected modifyCart(id: Product['id'], quantity = 1) {
    this.apiService
      .patch<CartItem>('/cart', { productId: id, quantity })
      .subscribe((result) => {
        this.cartItems.next(
          addOrUpdate(this.cartItems.value, result, 'productId'),
        )
      })
  }

  removeFromCart(product: Product) {
    this.modifyCart(product.id, -1)
  }

  clear() {
    this.apiService.delete('/cart').subscribe(() => {
      this.cartItems.next([])
    })
  }

  checkout(value: CreateOrderRequest) {
    return this.apiService.post('/orders', value)
  }
}
