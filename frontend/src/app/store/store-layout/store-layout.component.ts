import { Component, OnInit } from '@angular/core'
import { Product } from '../../models'
import { ProductService } from '../product.service'

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.css'],
})
export class StoreLayoutComponent implements OnInit {
  products: Array<Product> = []

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .fetchAllProducts()
      .subscribe((products) => (this.products = products))
  }
}
