import { AppError } from './AppError'

interface ValidationErrorEntry {
  message: string
  field: string
}

export class ValidationError extends AppError {
  private errors: Array<ValidationErrorEntry>

  constructor(errors: ValidationErrorEntry[]) {
    super('Validation error')
    this.errors = errors
  }

  get(field: string): ValidationErrorEntry | undefined {
    return this.errors.find((e) => e.field === field)
  }

  getAll(field: string): Array<ValidationErrorEntry> {
    return this.errors.filter(e => e.field === field)
  }
}
