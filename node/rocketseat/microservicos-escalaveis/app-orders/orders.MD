# app-orders

## Introdução
O `app-orders` é um microserviço responsável pelo gerenciamento de pedidos em uma arquitetura baseada em microserviços. Ele expõe uma API HTTP para criação de pedidos e se comunica com outros serviços via RabbitMQ, enviando mensagens quando um novo pedido é criado. O serviço utiliza banco de dados PostgreSQL para persistência dos dados e faz uso de tracing distribuído com OpenTelemetry.

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
- `src/tracer` - Configuração do OpenTelemetry

## Comandos npm
Execute os comandos abaixo na raiz do projeto `app-orders`:

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

2. Suba o banco de dados PostgreSQL do orders a partir do diretório `app-orders`:

```sh
docker-compose up -d
```

## Testando a API
Para criar um pedido:

```sh
curl -X POST http://localhost:3333/orders -H "Content-Type: application/json" -d '{"amount":5000}'
```

--- 