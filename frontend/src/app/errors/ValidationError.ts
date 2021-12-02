import { AppError } from './AppError'
import { FormGroup, ValidationErrors } from '@angular/forms'

interface ValidationErrorEntry {
  message: string
  field: string
  type: string
}

export class ValidationError extends AppError {
  private readonly errors: Array<ValidationErrorEntry>

  constructor(errors: ValidationErrorEntry[]) {
    super('Validation error')
    this.errors = errors
  }

  get(field: string): ValidationErrorEntry | undefined {
    return this.errors.find((e) => e.field === field)
  }

  getAll(field: string): Array<ValidationErrorEntry> {
    return this.errors.filter((e) => e.field === field)
  }

  all(): Array<ValidationErrorEntry> {
    return this.errors
  }

  applyToFormGroup(loginForm: FormGroup) {
    // Convert the errors to a map of errors per field
    const errorMap = this.errors.reduce((map, error) => {
      map[error.field] = {
        ...map[error.field],
        [error.type]: true,
      }
      return map
    }, {} as ValidationErrors)
    for (const [field, errors] of Object.entries(errorMap)) {
      loginForm.get(field)!.setErrors(errors)
    }
  }
}
