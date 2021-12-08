import { Entity } from './models'

/**
 * Get the payload part of the jwt token
 * BEWARE: This does not validate the token!!!
 */
export const getJwtPayload = (jwt: string) => {
  return JSON.parse(atob(jwt.split('.')[1]))
}

export const addOrUpdate = <T extends Record<string, any> = Entity>(
  list: T[],
  entity: T,
  key: keyof T = 'id',
): T[] => {
  const index = list.findIndex((e) => e[key] === entity[key])
  if (index === -1) {
    return list.concat(entity)
  }
  return list.map((e) => (e[key] === entity[key] ? entity : e))
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
