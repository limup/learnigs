import { fastify } from 'fastify'
import { env } from './env'
import cookie from '@fastify/cookie'
import { transactionRoutes2 } from './routes/transactions2'

const app = fastify()

app.register(cookie)

app.register(transactionRoutes2, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Runnig!')
  })
