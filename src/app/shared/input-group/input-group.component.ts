import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting:InputGroupComponent
    }
  ]
})
export class InputGroupComponent implements ControlValueAccessor {

  @Input()
  label?: string

  @Input()
  autocomplete?: string

  @Input()
  inputType: string = 'text'

  @Input()
  name: string = ''

  @Input()
  placeholder?: string

  @Input()
  required: boolean = false

  @Input()
  disabled: boolean = false

  constructor() {}

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: string): void {

  }
}
