import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs'
import { Order, User } from '../models'
import { addOrUpdate } from '../utils'
import { ApiService } from './api.service'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$ = new BehaviorSubject<Order<Date>[]>([])

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
  ) {}

  fetchOrders(): Observable<Order<Date>[]> {
    return this.authService.user$.pipe(
      filter((user): user is User => typeof user !== 'undefined'),
      switchMap(() => this.apiService.get<Order<string>[]>(`/orders`)),
      map((orders) =>
        orders.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        })),
      ),
      tap((orders) => this.orders$.next(orders)),
    )
  }

  fetchOrder(id: Order['id']): Observable<Order<Date>> {
    return this.authService.user$.pipe(
      filter((user): user is User => typeof user !== 'undefined'),
      switchMap(() => this.apiService.get<Order>(`/orders/${id}`)),
      map((order) => ({
        ...order,
        createdAt: new Date(order.createdAt),
      })),
      tap((order) => this.orders$.next(addOrUpdate(this.orders$.value, order))),
    )
  }
}
