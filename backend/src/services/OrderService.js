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

    const productMap = products.reduce((map, product) => {
      map.set(product.id, product)
      return map
    }, new Map())

    return await this.#orderRepository.create({
      data: {
        ...order,
        orderProducts: {
          create: cart.map((cartItem) => ({
            product: {
              connect: {
                id: cartItem.productId,
              },
            },
            quantity: cartItem.quantity,
            price: productMap.get(cartItem.productId).price,
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

  findOrdersByUser(userId) {
    return this.#orderRepository.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  findAll() {
    return this.#orderRepository.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        orderProducts: true,
      },
    })
  }
}
