import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, Input } from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DropdownComponent,
    },
  ],
  animations: [
    trigger('fadeOut', [
      state(
        'open',
        style({
          opacity: 1,
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
        }),
      ),
      transition('open => closed', [animate('100ms ease-in')]),
    ]),
  ],
})
export class DropdownComponent implements ControlValueAccessor, Validator {
  open = false

  @Input()
  errors: ValidationErrors | null = null

  @Input()
  label?: string

  @Input()
  name!: string

  @Input()
  required: boolean = false

  @Input()
  placeholder: string = 'Selecteer een optie'

  @Input()
  options!: string[]

  @Input()
  disabled: boolean = false

  value: string = ''
  touched: boolean = false

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

  handleChange(value: string) {
    this.markAsTouched()
    this.open = false
    if (!this.disabled) {
      this.onChange(value)
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
