import fs from 'fs/promises'
import { createReadStream } from 'fs'
import mmm from 'mmmagic'
import crypto from 'crypto'
import debugFactory from 'debug'
import { imageSchema } from './validation.mjs'

const { Magic, MAGIC_MIME_TYPE } = mmm

const uploadPath = new URL('../../static/uploads', import.meta.url)
  .toString()
  .substr(7)

const logger = debugFactory('backend:image-service')
const magic = new Magic(MAGIC_MIME_TYPE)

const detectMimeType = (buffer) =>
  new Promise((resolve, reject) => {
    magic.detect(buffer, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })

export default class ImageService {
  /** @property {Prisma.ImageDelegate<*>} */
  #imageRepository

  constructor(imageRepository) {
    this.#imageRepository = imageRepository
  }

  /**
   * @param {{ buffer: Buffer, size: number, mimetype: string }} file
   * @param {string} fieldName
   * @returns {Promise<string, Error>}
   */
  async validate(file, fieldName) {
    file.mimetype = await detectMimeType(file.buffer)

    return await imageSchema.validate(file)
  }

  /**
   *
   * @param {{ buffer: Buffer, fieldname: string, originalname: string, mimetype: string }} file
   * @returns {Promise<void>}
   */
  async store(file) {
    const path = crypto.createHash('sha256').update(file.buffer).digest('hex')
    const entity = await this.#imageRepository.create({
      data: {
        name: file.fieldname ?? file.originalname,
        mimeType: file.mimetype,
        path,
      },
    })
    try {
      logger(
        'Writing %d bytes to: %s',
        file.buffer.byteLength,
        `${uploadPath}/${path}`,
      )
      await fs.mkdir(uploadPath, { recursive: true })
      await fs.writeFile(`${uploadPath}/${path}`, file.buffer)
    } catch (error) {
      logger('Error during file write:', error.message)
      await this.#imageRepository.delete({ where: { id: entity.id } })
      return null
    }
    return entity
  }

  readStream(image) {
    return createReadStream(`${uploadPath}/${image.path}`)
  }
}
