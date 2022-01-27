import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Product } from '../../../models'

@Component({
  selector: 'app-order-summary-item',
  templateUrl: './order-summary-item.component.html',
  styleUrls: ['./order-summary-item.component.css'],
})
export class OrderSummaryItemComponent {
  @Input() public product!: Product

  @Input() public quantity!: number
  @Input() public price!: number

  get itemTotal(): number {
    return (this.price * this.quantity) / 100
  }
}
