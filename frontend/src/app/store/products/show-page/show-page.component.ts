import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CartService } from '../../../api/cart.service'
import { ProductService } from '../../../api/product.service'
import { Product } from '../../../models'

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css'],
})
export class ShowPageComponent implements OnInit {
  public product?: Product

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.productService.fetchProduct(id).subscribe((product) => {
        this.product = product!
      })
    })
  }

  public addToCart(): void {
    this.cartService.addToCart(this.product!.id)
  }
}
