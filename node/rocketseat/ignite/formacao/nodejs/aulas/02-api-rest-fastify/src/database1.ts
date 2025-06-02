import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

// Exibe as variáveis de ambientes e inclusive o que esta no arquivo .env
console.log(process.env)

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL as string,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/db/migrations',
  },
}

export const knex = setupKnex(config)
