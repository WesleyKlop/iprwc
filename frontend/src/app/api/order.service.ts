import { Injectable } from '@angular/core'
import { BehaviorSubject, switchMap, tap } from 'rxjs'
import { Order, Product } from '../models'
import { ApiService } from './api.service'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders = new BehaviorSubject<Order[]>([])

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
  ) {}

  fetchOrders() {
    console.log('fetching orders')
    this.authService.subscribeAuthChanges((user) => {
      if (!user) {
        return
      }
      this.apiService.get<Order[]>('/orders').subscribe((orders) => {
        this.orders.next(orders)
      })
    })
    return this.orders
  }
}
