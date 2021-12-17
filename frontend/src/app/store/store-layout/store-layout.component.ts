import { Component, OnInit } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import { filter } from 'rxjs'
import { AuthenticationService } from '../../api/authentication.service'
import { CartService } from '../../api/cart.service'
import { ProductService } from '../../api/product.service'

@Component({
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.css'],
})
export class StoreLayoutComponent implements OnInit {
  public productsInCart: number = 0
  public onCheckoutPage = false
  public showCart = false
  public isAuthenticated = false

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
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated
    })
  }

  public signOut() {
    this.authService.signOut()
  }
}
