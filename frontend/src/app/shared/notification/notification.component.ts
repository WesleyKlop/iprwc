import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NotificationType } from './notification'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  @Input() public type!: NotificationType
  @Input() public message!: string
  @Input() public title!: string

  @Output() public closeEvent = new EventEmitter<void>()

  constructor() {}
}
