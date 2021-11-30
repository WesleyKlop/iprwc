import { Injectable } from '@angular/core'
import { StoreModule } from './store.module'
import { ApiService } from '../api/api.service'
import { Product, Uuid } from '../models'

@Injectable({
  providedIn: StoreModule,
})
export class ProductService {
  constructor(private apiService: ApiService) {
  }

  public fetchAllProducts() {
    return this.apiService.get<Product[]>('/products')
  }

  public findProduct(id: Uuid) {
    return this.apiService.get<Product>(`/products/${id}`)
  }
}
