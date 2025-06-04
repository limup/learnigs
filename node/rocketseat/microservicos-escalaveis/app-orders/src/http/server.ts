import '@opentelemetry/auto-instrumentations-node/register'

import { fastify } from 'fastify'
import { randomUUID } from 'node:crypto'
import { setTimeout } from 'node:timers/promises'
import { fastifyCors } from '@fastify/cors'
import { trace } from '@opentelemetry/api'
import { z } from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { channels } from '../broker/channels/index.ts'
import { schema } from '../db/schema/index.ts'
import { db } from '../db/client.ts'
import { dispatchOrderCreated } from '../broker/messages/order-created.ts'
import { tracer } from '../tracer/tracer.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: '*' })

app.get('/health', () => {
  return 'OK'
})

app.post('/orders', {
  schema: {
    body: z.object({
      amount: z.coerce.number(),
    })
  }
}, async (request, reply) => {
  const { amount } = request.body

  console.log('Creating an order with amount', amount)

  const orderId = randomUUID()

  await db.insert(schema.orders).values({
    id: orderId,
    customerId: 'B9176D35-7276-4255-A323-D825CAEE03B5',
    amount,
  })

  const span = tracer.startSpan('eu acho que aqui ta dando merda')

  span.setAttribute('teste', 'Hello World')

  await setTimeout(2000)

  span.end()

  trace.getActiveSpan()?.setAttribute('order_id', orderId)

  dispatchOrderCreated({
    orderId,
    amount,
    customer: {
      id: 'B9176D35-7276-4255-A323-D825CAEE03B5',
    },    
  })

  return reply.status(201).send()
})

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('[Orders] HTTP Server running!')
})