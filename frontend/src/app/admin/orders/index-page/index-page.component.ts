import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../api/order.service'
import { ProductService } from '../../../api/product.service'
import { Order, Product, User } from '../../../models'

type FatOrder = Order<Date> & { user: User }

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  orders: FatOrder[] = []
  products: Product[] = []

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.orderService.fetchOrders(true).subscribe(orders => {
      this.orders = orders as FatOrder[]
    })
    this.productService.fetchAllProducts().subscribe((products) => {
      this.products = products
    })
  }
}
