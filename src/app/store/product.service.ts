import { Injectable } from '@angular/core'
import { ApiService } from '../api/api.service'
import { Product, Uuid } from '../models'
import { BehaviorSubject, switchMap, tap, map } from 'rxjs'
import { addOrUpdate } from '../utils'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = new BehaviorSubject<Product[]>([])

  constructor(private apiService: ApiService) {}

  public fetchAllProducts() {
    return this.apiService.get<Product[]>('/products').pipe(
      tap((products) => this.products.next(products)),
      switchMap(() => this.products),
    )
  }

  public fetchProduct(id: Uuid) {
    return this.apiService.get<Product>(`/products/${id}`).pipe(
      tap((product) =>
        this.products.next(addOrUpdate(this.products.value, product)),
      ),
      switchMap(() => this.products),
      map((products) => products.find((product) => product.id === id)),
    )
  }
}
