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
  onCheckoutPage = false
  showCart = false

  public isAuthenticated = false
  public isCustomer = false

  get shouldShowCartButton() {
    return !this.onCheckoutPage && this.productsInCart > 0
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.cartService.count$.subscribe((count) => {
      this.productsInCart = count
    })
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart,
        ),
      )
      .subscribe((route) => {
        this.onCheckoutPage = route.url === '/checkout'
      })
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = typeof user !== 'undefined'
      this.isCustomer = user?.role === 'USER'
    })
  }

  public signOut() {
    this.authService.signOut()
  }
}
