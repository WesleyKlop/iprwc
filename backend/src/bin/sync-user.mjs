#!/usr/bin/env node
import dotenv from 'dotenv'
import prisma from '../services/prisma.mjs'
import UserService from '../services/UserService.mjs'

dotenv.config()

const service = new UserService(prisma.user)

const email = process.env.APP_ADMIN_EMAIL
const password = process.env.APP_ADMIN_PASSWORD

if (!email || !password) {
  console.error('Missing APP_ADMIN_EMAIL or APP_ADMIN_PASSWORD')
  process.exit(1)
}

console.log('Creating user with email:', email)
await service.createOrUpdateUser(email, 'Admin', password, 'ADMIN')

console.log('User created or updated!')
