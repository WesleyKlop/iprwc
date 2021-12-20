import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, HostBinding, OnInit } from '@angular/core'
import { Notification } from '../notification/notification'
import { NotificationService } from '../notification/notification.service'

@Component({
  selector: 'app-current-notification',
  templateUrl: './current-notification.component.html',
  styleUrls: ['./current-notification.component.css'],
  animations: [
    trigger('slideIn', [
      state(
        'visible',
        style({
          transform: 'translateX(0)',
        }),
      ),
      state(
        'hidden',
        style({
          transform: 'translateX(100%)',
        }),
      ),
      transition('visible => hidden', [animate('400ms 0s ease-out')]),
      transition('hidden => visible', [animate('400ms 0s ease-in')]),
    ]),
  ],
})
export class CurrentNotificationComponent implements OnInit {
  public notification?: Notification
  public visible = false

  private timeoutHandle = -1

  @HostBinding('@slideIn') get getSlideIn(): string {
    return this.visible ? 'visible' : 'hidden'
  }

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.current$.subscribe((notification) => {
      this.notification = notification
      this.visible = true
      this.timeoutHandle = setTimeout(() => {
        if (this.notification === notification) {
          this.dismissNotification()
        }
      }, notification.duration)
    })
  }

  dismissNotification() {
    if (this.timeoutHandle !== -1) {
      clearTimeout(this.timeoutHandle)
      this.timeoutHandle = -1
    }
    this.visible = false
  }
}
