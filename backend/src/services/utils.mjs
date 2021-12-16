/** @param {string} postalCode */
export const normalizePostalCode = (postalCode) =>
  postalCode.toUpperCase().replace(/[^A-Z0-9]/g, '')
