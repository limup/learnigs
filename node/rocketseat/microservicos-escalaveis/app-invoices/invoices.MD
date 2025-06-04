# app-invoices

## Introdução
O `app-invoices` é um microserviço responsável pelo gerenciamento de faturas, consumindo mensagens de pedidos criados via RabbitMQ. Ele escuta eventos do serviço de pedidos (`app-orders`) e pode ser expandido para processar e registrar faturas a partir desses eventos. Utiliza banco de dados PostgreSQL para persistência e OpenTelemetry para tracing distribuído.

## Stacks Utilizadas
- Node.js + TypeScript
- Fastify
- Zod (validação de dados)
- Drizzle ORM
- PostgreSQL
- RabbitMQ
- OpenTelemetry (tracing)
- Docker

## Estrutura de Pastas
- `src/http` - Servidor HTTP (Fastify)
- `src/db` - Schemas, client e migrations do banco
- `src/broker` - Integração com RabbitMQ

## Comandos npm
Execute os comandos abaixo na raiz do projeto `app-invoices`:

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run start` - Inicia o servidor em modo produção
- `npm run build` - Compila o projeto TypeScript
- `npm run db:generate` - Gera o schema do banco com Drizzle
- `npm run db:migrate` - Executa as migrations do banco
- `npm run db:studio` - Abre o Drizzle Studio
- `npm run db:push` - Aplica alterações do schema no banco

## Subindo o Docker Compose
1. Suba o RabbitMQ e Jaeger (tracing) a partir do diretório `microservicos-escalaveis`:

```sh
docker-compose up -d
```

2. Suba o banco de dados PostgreSQL do invoices a partir do diretório `app-invoices`:

```sh
docker-compose up -d
```

--- 