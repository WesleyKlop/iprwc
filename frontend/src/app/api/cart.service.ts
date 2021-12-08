import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs'
import { CartItem, CartProduct, Product } from '../models'
import { addOrUpdate, getJwtPayload } from '../utils'
import { AuthenticationService } from './authentication.service'
import { ProductService } from './product.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([])

  constructor(
    private apiService: ApiService,
    private productService: ProductService,
    private authService: AuthenticationService,
  ) {
    const savedToken = localStorage.getItem('app.jwt')
    if (savedToken) {
      const { cart } = getJwtPayload(savedToken)
      this.cartItems.next(cart)
    }
  }

  products(): Observable<CartProduct[]> {
    return this.cartItems.pipe(
      switchMap((items: CartItem[], _) => {
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

  removeFromCart(cartItem: CartItem) {
    this.modifyCart(cartItem.productId, -1)
  }
}
