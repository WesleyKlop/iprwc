import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CartService } from '../../api/cart.service'
import { CartProduct } from '../../models'

@Component({
  selector: 'app-cart-overlay',
  templateUrl: './cart-overlay.component.html',
  styleUrls: ['./cart-overlay.component.css'],
})
export class CartOverlayComponent implements OnInit {
  @Input()
  open!: boolean

  @Output()
  openChange = new EventEmitter<boolean>()

  cartProducts: CartProduct[] = []

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.products().subscribe((products) => {
      this.cartProducts = products
    })
  }

  close() {
    this.openChange.emit(false)
  }

  removeFromCart(cartItem: CartProduct) {
    this.cartService.removeFromCart(cartItem)
  }

  get total() {
    return this.cartProducts.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity
    }, 0)
  }
}
