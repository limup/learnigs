import { fastify } from 'fastify'
import { env } from './env'
import cookie from '@fastify/cookie'
import { transactionRoutes1 } from './routes/transactions1'

const app = fastify()

app.register(cookie)

app.register(transactionRoutes1, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Runnig!')
  })
