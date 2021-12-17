import { Component, OnInit } from '@angular/core'
import { OrderService } from '../../../api/order.service'
import { ProductService } from '../../../api/product.service'
import { Order, Product } from '../../../models'

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
})
export class IndexPageComponent implements OnInit {
  public orders: Order<Date>[] = []
  public products: Product[] = []
  public showAll = false

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.orderService.fetchOrders().subscribe((orders) => {
      this.orders = orders
    })
    this.productService.fetchAllProducts().subscribe((products) => {
      this.products = products
    })
  }

  get ordersToShow(): Order<Date>[] {
    if (this.showAll) {
      return this.orders
    }
    return this.orders.slice(0, 5)
  }
}
