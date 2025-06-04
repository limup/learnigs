import amqp from 'amqplib'

if (!process.env.BROKER_URL) {
  throw new Error('BROKER_URL must be configured.')
}

export const broker = await amqp.connect(process.env.BROKER_URL)