import { Entity } from './models'

export const addOrUpdate = <T extends Entity>(list: T[], entity: T): T[] => {
  const index = list.findIndex((e) => e.id === entity.id)
  if (index === -1) {
    return list.concat(entity)
  }
  return list.map((e) => (e.id === entity.id ? entity : e))
}
