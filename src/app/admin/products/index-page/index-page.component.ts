import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../../store/product.service'
import { Product } from '../../../models'

@Component({
  selector: 'app-products-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
})
export class IndexPageComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchAllProducts().subscribe((products) => {
      this.products = products
    })
  }
}
