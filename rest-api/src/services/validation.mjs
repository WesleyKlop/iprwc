import * as yup from 'yup'

export const addProductToCartSchema = yup.object().shape({
  productId: yup.string().uuid().required(),
  quantity: yup.number().required().min(1),
})

export const patchProductCartSchema = yup.object().shape({
  productId: yup.string().uuid().required(),
  quantity: yup.number().required().min(-1).max(1),
})

export const storeOrderSchema = yup.object().shape({
  name: yup.string().min(1).required(),
  email: yup.string().email().required(),

  // Other address info?
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})
