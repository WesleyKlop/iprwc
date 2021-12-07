import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../../api/authentication.service'
import { CartService } from '../../api/cart.service'
import { Product } from '../../models'
import { ProductService } from '../../api/product.service'

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.css'],
})
export class StoreLayoutComponent implements OnInit {
  productsInCart: number = 0

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService,
  ) {}

  public ngOnInit() {
    this.cartService.count().subscribe((count) => (this.productsInCart = count))
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated()
  }

  public isCustomer() {
    return this.authService.isUser()
  }

  public signOut() {
    this.authService.signOut()
  }
}
