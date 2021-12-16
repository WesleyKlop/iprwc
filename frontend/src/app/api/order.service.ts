import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs'
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

  fetchOrders(): Observable<Order[]> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (!user) {
          return of([])
        }
        return this.apiService.get<Order[]>(`/orders/${user.id}`)
      }),
      tap((orders) => this.orders.next(orders)),
    )
  }
}
