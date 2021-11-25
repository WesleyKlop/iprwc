import bcrypt from 'bcrypt'
import { PrismaClient } from '../src/prisma.mjs'

const prisma = new PrismaClient()

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

await prisma.product.create({
  data: {
    name: 'Test product',
    description: 'Test product description',
    price: 1337, // EUR 13.37
  },
})
