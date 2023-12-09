import { fastify } from 'fastify'
import { knex } from './database1'

const app = fastify()

app.get('/hello', async () => {
  const tables = knex('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Runnig!')
  })
