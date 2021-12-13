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

  city: yup.string().min(1).required(),
  paymentMethod: yup.string().min(1).required(),
  postalCode: yup.string().min(1).required(),
  street: yup.string().min(1).required(),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

export const imageSchema = yup.object().shape({
  size: yup
    .number()
    .required()
    .max(2 ** 20),
  mimetype: yup
    .string()
    .required()
    .matches(/^image\//),
})

export const getOrderSchema = yup.object().shape({
  orderId: yup.string().required().uuid(),
})
