import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs'
import { CartItem, CartProduct, Product } from '../models'
import { NotificationService } from '../shared/notification/notification.service'
import { addOrUpdate, getJwtPayload } from '../utils'
import { AuthenticationService } from './authentication.service'
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
  private cartItems$ = new BehaviorSubject<CartItem[]>([])
  public readonly cartProducts$: Observable<CartProduct[]>
  public readonly count$: Observable<number>

  constructor(
    private apiService: ApiService,
    private productService: ProductService,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
  ) {
    this.subscribeCartFromToken()
    this.cartProducts$ = this.cartItems$.pipe(
      filter((items) => Array.isArray(items)),
      switchMap((items: CartItem[]) => {
        if (!items.length) {
          return of([])
        }
        return this.mapProductsToCartProducts(items)
      }),
    )
    this.count$ = this.cartItems$.pipe(
      filter((items) => Array.isArray(items)),
      map((items) => items.reduce((acc, item) => acc + item.quantity, 0)),
    )
  }

  private subscribeCartFromToken() {
    this.authService.token$
      .pipe(filter((token): token is string => typeof token === 'string'))
      .subscribe((token: string) => {
        const payload = getJwtPayload(token)
        if (payload) this.cartItems$.next(payload.cart)
      })
  }

  public async addToCart(product: Product) {
    await this.modifyCart(product.id, 1)
    this.notificationService.success(
      'Product toegevoegd',
      `${product.name} is toegevoegd aan je winkelwagen`,
      5000,
    )
  }

  protected modifyCart(id: Product['id'], quantity = 1): Promise<CartItem> {
    const observable = this.apiService
      .patch<CartItem>('/cart', { productId: id, quantity })
      .pipe(
        tap((result) => {
          this.cartItems$.next(
            addOrUpdate(this.cartItems$.value, result, 'productId'),
          )
        }),
      )
    return firstValueFrom(observable)
  }

  public removeFromCart(product: Product) {
    this.modifyCart(product.id, -1)
  }

  public clear() {
    this.apiService.delete('/cart').subscribe(() => {
      this.cartItems$.next([])
    })
  }

  public checkout(value: CreateOrderRequest) {
    return this.apiService.post('/orders', value).pipe(
      tap(() => {
        this.notificationService.success(
          'Bestelling geplaatst',
          'Je bestelling is succesvol geplaatst! In je mailbox vindt je een link om in te loggen.',
          10 * 1000,
        )
      }),
    )
  }

  private mapProductsToCartProducts(items: CartItem[]) {
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
  }
}
