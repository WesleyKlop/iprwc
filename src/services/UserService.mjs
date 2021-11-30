import crypto from 'crypto'
import bcrypt from 'bcrypt'

export default class UserService {
  #userRepository

  /**
   * @param {Prisma.UserDelegate<*>} userRepository
   */
  constructor(userRepository) {
    this.#userRepository = userRepository
  }

  generateRandomPassword() {
    const randomPassword = crypto.randomBytes(16).toString('hex')
    return bcrypt.hash(randomPassword, 10)
  }

  async findOrCreateUser(email, name) {
    const user = await this.#userRepository.findUnique({
      where: { email },
    })
    if (user) {
      return user
    }

    return this.#userRepository.create({
      data: {
        email,
        name,
        password: await this.generateRandomPassword(),
        role: 'USER',
      },
    })
  }
}
