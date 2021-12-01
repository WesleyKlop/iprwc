import { Component, OnInit } from '@angular/core'
import { Product } from '../../../models'
import { ProductService } from '../../../store/product.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css'],
})
export class ShowPageComponent implements OnInit {
  product?: Product

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService
        .fetchProduct(params['id'])
        .subscribe((product) => (this.product = product))
    })
  }
}
