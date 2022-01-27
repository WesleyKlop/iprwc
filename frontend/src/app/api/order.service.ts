import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs'
import { Order, User } from '../models'
import { addOrUpdate } from '../utils'
import { ApiService } from './api.service'
import { AuthenticationService } from './authentication.service'

const mapOrder = (order: Order<string>): Order<Date> => ({
  ...order,
  createdAt: new Date(order.createdAt),
})

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$ = new BehaviorSubject<Order<Date>[]>([])

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
  ) {
  }

  public fetchOrders(forAllUsers = false): Observable<Order<Date>[]> {
    return this.authService.user$.pipe(
      filter((user): user is User => typeof user !== 'undefined'),
      switchMap((user) => this.apiService.get<Order<string>[]>(`/orders`, {
        all: user.role === 'ADMIN' && forAllUsers,
      })),
      map((orders) => orders.map((order) => mapOrder(order))),
      tap((orders) => this.orders$.next(orders)),
    )
  }

  public fetchOrder(id: Order['id']): Observable<Order<Date>> {
    return this.authService.user$.pipe(
      filter((user): user is User => typeof user !== 'undefined'),
      switchMap(() => this.apiService.get<Order>(`/orders/${id}`)),
      map((order) => mapOrder(order)),
      tap((order) => this.orders$.next(addOrUpdate(this.orders$.value, order))),
    )
  }
}
