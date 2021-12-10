import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-cart-overlay-total',
  templateUrl: './cart-overlay-total.component.html',
  styleUrls: ['./cart-overlay-total.component.css'],
})
export class CartOverlayTotalComponent {
  @Input()
  total!: number

  @Output()
  closeEvent = new EventEmitter<void>()

  constructor() {}

  close() {
    this.closeEvent.emit()
  }
}
