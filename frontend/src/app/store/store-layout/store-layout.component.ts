import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationStart, Router } from '@angular/router'
import { filter } from 'rxjs'
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
  showCart = false
  onCheckoutPage = false

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.cartService.count().subscribe((count) => {
      this.productsInCart = count
    })
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        const route = event as NavigationStart
        this.onCheckoutPage = route.url === '/checkout'
      })
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
