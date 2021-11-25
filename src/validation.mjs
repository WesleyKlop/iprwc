import yup from 'yup'

export const addProductToCartSchema = yup.object().shape({
  productId: yup.string().uuid().required(),
  quantity: yup.number().required().min(1),
})

export const modifyProductCartSchema = yup.object().shape({
  productId: yup.string().uuid().required(),
  quantity: yup.number().required().min(-1).max(1),
})
