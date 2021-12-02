import { Component, Input } from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms'
import { formatValidationMessage } from '../../utils'

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
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputGroupComponent,
    },
  ],
})
export class InputGroupComponent implements ControlValueAccessor, Validator {
  @Input()
  errors: ValidationErrors | null = null

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

  get nextValidationError(): string | null {
    if (this.errors !== null) {
      const [key, props] = Object.entries(this.errors)[0]
      return formatValidationMessage(key, props, this.label)
    }
    return null
  }

  onChange = (_: any) => {}

  onTouched = () => {}

  onValidatorChange = () => {}

  registerOnValidatorChange(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange
  }

  registerOnChange(onChange: any) {
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

  validate(control: AbstractControl): ValidationErrors | null {
    return null
  }
}
