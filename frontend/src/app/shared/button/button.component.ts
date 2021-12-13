import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  type: 'button' | 'submit' | 'reset' = 'button'

  @Input()
  size: 'md' | 'lg' = 'md'

  @Input()
  disabled = false

  constructor() {}
}
