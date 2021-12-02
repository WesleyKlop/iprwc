import { Component, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputGroupComponent,
    },
  ],
})
export class InputGroupComponent implements ControlValueAccessor {
  @Input()
  label?: string

  @Input()
  autocomplete?: string

  @Input()
  inputType: string = 'text'

  @Input()
  name!: string

  @Input()
  placeholder?: string

  @Input()
  required: boolean = false

  @Input()
  disabled: boolean = false

  value: string = ''
  touched: boolean = false

  onChange = (_: any) => {}

  onTouched = () => {}

  registerOnChange(onChange: any) {
    console.log(this)
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: string): void {
    this.value = value
  }

  handleChange(evt: any) {
    this.markAsTouched()
    if (!this.disabled) {
      this.onChange(evt.target.value)
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched()
      this.touched = true
    }
  }
}
