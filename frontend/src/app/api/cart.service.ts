import { Injectable } from '@angular/core'
import { BehaviorSubject, map, mergeMap, Observable, switchMap } from 'rxjs'
import { CartItem, CartProduct } from '../models'
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
  ) {}

  products(): Observable<CartProduct[]> {
    return this.cartItems.pipe(
      switchMap((items: CartItem[], _) => {
        return this.productService.fetchAllProducts().pipe(
          map((products) => {
            return products.map((product) => {
              const item = items.find((item) => item.productId === product.id)!
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
}
