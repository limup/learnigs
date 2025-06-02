import { fastify } from 'fastify'
import cookie from '@fastify/cookie'
import { transactionRoutes2 } from './routes/transactions2'

export const app = fastify()

app.register(cookie)

app.register(transactionRoutes2, {
  prefix: 'transactions',
})
