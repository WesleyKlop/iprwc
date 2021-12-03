import { Injectable } from '@angular/core'
import { ApiService } from '../api/api.service'
import { Product, Uuid } from '../models'
import {
  BehaviorSubject,
  switchMap,
  tap,
  map,
  Observable,
  catchError,
  throwError,
  of,
} from 'rxjs'
import { addOrUpdate } from '../utils'
import { AjaxResponse } from 'rxjs/ajax'

interface ProductCreateRequest {
  name: string
  description: string
  price: number
  imageId: Uuid
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = new BehaviorSubject<Product[]>([])

  constructor(private apiService: ApiService) {}

  public fetchAllProducts(): Observable<Array<Product>> {
    return this.apiService.get<Product[]>('/products').pipe(
      tap((products) => this.products.next(products)),
      switchMap(() => this.products),
    )
  }

  public fetchProduct(id: Uuid): Observable<null | Product> {
    return this.apiService.get<Product>(`/products/${id}`).pipe(
      tap((product) =>
        this.products.next(addOrUpdate(this.products.value, product)),
      ),
      catchError((response: any) => {
        if (response.status === 404) {
          return of(null)
        }
        return throwError(response)
      }),
    )
  }

  public createProduct(product: ProductCreateRequest): Observable<Product> {
    if (!Number.isSafeInteger(product.price)) {
      product.price *= 100
    }
    return this.apiService
      .post<Product>('/products', product)
      .pipe(
        tap((product) =>
          this.products.next(addOrUpdate(this.products.value, product)),
        ),
      )
  }
}
