import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CartService } from '../../api/cart.service'
import { CartProduct, Product } from '../../models'

@Component({
  selector: 'app-cart-overlay',
  templateUrl: './cart-overlay.component.html',
  styleUrls: ['./cart-overlay.component.css'],
  animations: [
    trigger('overlay', [
      state(
        'open',
        style({
          opacity: 1,
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
        }),
      ),
      transition('open <=> closed', [animate('500ms')]),
    ]),
    trigger('slideOver', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        }),
      ),
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
        }),
      ),
      transition('open <=> closed', [animate('500ms 0s ease-in-out')]),
    ]),
  ],
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

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product)
  }

  get total() {
    return this.cartProducts.reduce((acc, { product, quantity }) => {
      return acc + product.price * quantity
    }, 0)
  }
}
