import { fastify } from 'fastify'
import { knex } from './database1'

const app = fastify()

app.get('/hello', async () => {
  // const transactions = await knex('transactions').select('*')

  // const transactions = await knex('transactions')
  //   .where('amount', 1000)
  //   .select('*')

  const transactions = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Runnig!')
  })
