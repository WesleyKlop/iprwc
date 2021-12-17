import { Component, Input, OnInit } from '@angular/core'
import { CartService } from '../../../api/cart.service'
import { OrderService } from '../../../api/order.service'
import { Order, OrderProduct, Product } from '../../../models'

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  @Input()
  public orderId!: string
  @Input()
  public products!: Product[]

  public order?: Order<Date>

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) {}

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

  ngOnInit(): void {
    this.orderService.fetchOrder(this.orderId).subscribe((order) => {
      this.order = order
    })
  }

  addToCart(op: OrderProduct) {
    this.cartService.addToCart(op.productId)
  }
}
