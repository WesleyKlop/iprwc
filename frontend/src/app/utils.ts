import { Entity } from './models'

export const addOrUpdate = <T extends Entity>(list: T[], entity: T): T[] => {
  const index = list.findIndex((e) => e.id === entity.id)
  if (index === -1) {
    return list.concat(entity)
  }
  return list.map((e) => (e.id === entity.id ? entity : e))
}

type ErrorFormatters = Record<string, (prop: any, label?: string) => string>

const validationErrorMap: ErrorFormatters = {
  minlength: ({ actualLength, requiredLength }, label) =>
    `${label || 'Waarde'} moet minimaal ${requiredLength} tekens lang zijn.`,
  min: ({ actualLength, requiredLength }, label) =>
    `${label || 'Waarde'} moet minimaal ${requiredLength} tekens lang zijn.`,
  required: (_, label) => `${label || 'Waarde'} is verplicht.`,
  email: (_, label) => `${label || 'Waarde'} is geen geldig e-mailadres.`,
  image: (_, label) => `${label || 'Waarde'} is geen geldige afbeelding.`,
}

export const formatValidationMessage = (
  key: string,
  props: any,
  label?: string,
): string => {
  if (key in validationErrorMap) {
    return validationErrorMap[key](props, label)
  }
  return 'Validatie error'
}
