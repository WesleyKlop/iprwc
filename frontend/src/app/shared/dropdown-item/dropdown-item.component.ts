import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.css'],
})
export class DropdownItemComponent {
  @Input()
  value!: string

  @Input()
  selected!: boolean

  @Output()
  selectEvent = new EventEmitter<string>()

  highlighted = false

  constructor() {}
}
