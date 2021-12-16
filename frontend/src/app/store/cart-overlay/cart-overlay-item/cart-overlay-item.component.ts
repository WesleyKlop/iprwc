import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product } from '../../../models'

@Component({
  selector: 'app-cart-overlay-item',
  templateUrl: './cart-overlay-item.component.html',
  styleUrls: ['./cart-overlay-item.component.css'],
})
export class CartOverlayItemComponent {
  @Input()
  product!: Product

  @Input()
  quantity!: number

  @Output()
  removeProduct = new EventEmitter<Product>()

  @Input()
  removable: boolean = true

  @Input()
  showSum: boolean = false

  removeFromCart() {
    this.removeProduct.emit(this.product)
  }
}
