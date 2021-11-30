import { Component } from '@angular/core'
import { Product } from './models'
import { ProductService } from './store/product.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products: Array<Product> = []

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.fetchAllProducts().subscribe(products => this.products = products)
  }
}
