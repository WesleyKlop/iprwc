import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../api/product.service'
import { Product } from '../../models'

@Component({
  selector: 'app-index-page',
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
