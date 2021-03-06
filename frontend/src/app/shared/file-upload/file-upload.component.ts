import { Component, Input } from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import { ImageService } from '../../api/image.service'
import { ValidationError } from '../../errors/ValidationError'
import { formatValidationMessage } from '../../utils'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input()
  errors: ValidationErrors | null = null

  @Input()
  label?: string

  @Input()
  name!: string

  @Input()
  required: boolean = false

  @Input()
  disabled: boolean = false

  value?: File
  touched: boolean = false

  constructor(private imageService: ImageService) {}

  onChange = (_: any) => {}

  onTouched = () => {}

  registerOnChange(onChange: any) {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: File): void {
    this.value = value
  }

  handleChange(evt: Event) {
    this.markAsTouched()
    if (this.disabled) return
    const input = evt.target as HTMLInputElement
    const file = input.files![0]

    this.imageService.uploadImage(file).subscribe({
      next: (image) => {
        this.onChange(image.id)
      },
      error: (err: ValidationError) => {
        this.errors = {
          image: err.all().map((e) => e.type),
        }
      },
    })
  }

  get nextValidationError(): string | null {
    if (this.errors !== null) {
      const [key, props] = Object.entries(this.errors)[0]
      return formatValidationMessage(key, props, this.label)
    }
    return null
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched()
      this.touched = true
    }
  }
}
