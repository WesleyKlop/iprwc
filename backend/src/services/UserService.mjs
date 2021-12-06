import crypto from 'crypto'
import { hash, compare } from 'bcrypt'
import User from '../dto/User.mjs'

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
    return hash(randomPassword, 10)
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

  /**
   * @param {Credentials} credentials
   * @returns {Promise<User>}
   */
  async attempt(credentials) {
    const user = await this.#userRepository.findUnique({
      where: { email: credentials.email },
    })

    if (!user) {
      return null
    }

    const isPasswordValid = await compare(credentials.password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return new User(user.id, user.name, user.email, user.role)
  }
}
