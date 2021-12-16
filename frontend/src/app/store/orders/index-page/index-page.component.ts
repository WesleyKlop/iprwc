import { Component, OnInit } from '@angular/core'
import { OrderService } from '../../../api/order.service'
import { Order } from '../../../models'

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css'],
})
export class IndexPageComponent implements OnInit {
  private orders: Order[] = []

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.fetchOrders().subscribe((orders) => {
      this.orders = orders
    })
  }
}
