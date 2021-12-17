import bcrypt from 'bcrypt'
import prisma from '../src/services/prisma.mjs'

const password = await bcrypt.hash('password', 10)

await prisma.user.createMany({
  data: [
    {
      email: 'wesley19097@gmail.com',
      name: 'Wesley Klop',
      password,
      role: 'ADMIN',
    },
    { email: 'user@ipr.wc', name: 'Test User', password },
  ],
})

const image = await prisma.image.create({
  data: {
    name: 'test.jpg',
    path: 'c7620c52f1a8d61bb4d4eb13a61757fd55f554638e428929fa6cbdb358639c40',
    mimeType: 'image/jpeg',
  },
})

await prisma.product.create({
  data: {
    name: 'Test product',
    description: 'Test product description',
    price: 1337, // EUR 13.37
    imageId: image.id,
  },
})
