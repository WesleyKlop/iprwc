import { Component, Input } from '@angular/core'
import { Order, OrderProduct, Product, User } from '../../../models'

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  @Input()
  public order!: Order<Date>
  @Input()
  public products!: Product[]
  @Input()
  public user!: User

  public showOrderProducts = false

  public get orderTotal(): number {
    return this.order!.orderProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    )
  }

  public get orderProducts(): (OrderProduct & { product: Product })[] {
    return this.order!.orderProducts.map((orderProduct) => ({
      ...orderProduct,
      product: this.products.find(
        (product) => product.id === orderProduct.productId,
      )!,
    }))
  }
}
