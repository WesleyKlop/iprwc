import AppError from '../errors/AppError.mjs'

export default class OrderService {
  /** @property {Prisma.OrderDelegate<*>} */
  #orderRepository
  /** @type {Prisma.ProductDelegate<*>} */
  #productRepository

  /**
   * @param {Prisma.OrderDelegate<*>} orderRepository
   * @param {Prisma.ProductDelegate<*>} productRepository
   */
  constructor(orderRepository, productRepository) {
    this.#orderRepository = orderRepository
    this.#productRepository = productRepository
  }

  /**
   * @param {{ userId: Uuid, city: string, postalCode: string, street: string, paymentMethod: string }} order
   * @param {CartItem[]} cart
   */
  async createOrder(order, cart) {
    // We have to fetch the products because we need their price.
    const products = await this.#productRepository.findMany({
      where: {
        id: {
          in: cart.map((item) => item.productId),
        },
      },
    })

    if (products.length !== cart.length) {
      throw new AppError('Cart contains invalid products', 500)
    }

    return await this.#orderRepository.create({
      data: {
        ...order,
        orderProducts: {
          create: products.map((product) => ({
            product: {
              connect: {
                id: product.id,
              },
            },
            quantity: product.quantity,
            price: product.price,
          })),
        },
      },
    })
  }

  findOrderById(orderId, withProducts = false) {
    return this.#orderRepository.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderProducts: withProducts,
      },
    })
  }
}
