import { PrismaClient } from '../services/prisma.mjs'
import { Router } from 'express'
import multer from 'multer'
import ImageService from '../services/ImageService.mjs'
import { admin } from '../middleware/guards.mjs'
import JsonResponse from '../http/JsonResponse.mjs'
import NotFoundError from '../errors/NotFoundError.mjs'

const prisma = new PrismaClient()
const router = new Router()

const upload = multer()

const imageService = new ImageService(prisma.image)

router.post('/', admin, upload.single('image'), async (req, res, next) => {
  await imageService.validate(req.file, 'image')

  const image = await imageService.store(req.file)

  return JsonResponse.from(req).withData(image).send(res)
})

router.get('/:imageId', async (req, res, next) => {
  const image = await prisma.image.findUnique({
    where: {
      id: req.params.imageId,
    },
  })

  if (!image) {
    throw new NotFoundError('Image', req.params.imageId)
  }

  const stream = imageService.readStream(image)
  stream.addListener('open', () => {
    res.setHeader('Content-Type', image.mimeType)
    stream.pipe(res)
  })
  stream.addListener('error', next)
})

export default router
