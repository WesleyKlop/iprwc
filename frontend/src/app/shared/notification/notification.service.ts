import { Injectable } from '@angular/core'
import { interval, Observable, Subject, tap, throttle } from 'rxjs'
import { Notification } from './notification'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications$ = new Subject<Notification>()

  public readonly current$: Observable<Notification>

  constructor() {
    this.current$ = this.notifications$.pipe(
      tap(() => console.log('notification')),
      throttle(
        (notification) => {
          console.log('Throttling...', notification)
          return interval(notification.duration)
        },
        { leading: true, trailing: true },
      ),
    )
  }

  push(notification: Notification): void {
    this.notifications$.next(notification)
  }

  public success(title: string, message: string, duration: number = 3000) {
    this.push(new Notification(title, message, 'success', duration))
  }

  public failure(title: string, message: string, duration: number = 3000) {
    this.push(new Notification(title, message, 'failure', duration))
  }

  public info(title: string, message: string, duration: number = 3000) {
    this.push(new Notification(title, message, 'info', duration))
  }
}
