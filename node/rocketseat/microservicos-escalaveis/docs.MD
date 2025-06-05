# Microsserviços Escaláveis - Rocketseat

## Sobre o Projeto
Este projeto foi desenvolvido a partir do desafio prático da Rocketseat: **Microsserviços Escaláveis**.

### Proposta do Desafio
> Em 4 encontros práticos com o Diego Fernandes, aprenderá:
> - Microsserviços com Node.js
> - Integração com RabbitMQ
> - Observabilidade com Grafana
> - Deploy na AWS com Pulumi

O projeto é composto por dois microserviços principais:

- [app-orders](./app-orders/orders.MD): Gerenciamento de pedidos, API HTTP, integração com RabbitMQ, PostgreSQL e tracing distribuído.
- [app-invoices](./app-invoices/invoices.MD): Consome eventos de pedidos via RabbitMQ, gerencia faturas, integra com PostgreSQL e tracing distribuído.

Cada serviço possui sua documentação detalhada nos arquivos acima.

## Acessando as UIs de Observabilidade

### RabbitMQ Management
- URL: [http://localhost:15672](http://localhost:15672)
- Usuário: `guest`
- Senha: `guest`

### Jaeger (Tracing)
- URL: [http://localhost:16686](http://localhost:16686)

## Estrutura
- [app-orders/orders.MD](./app-orders/orders.MD): Documentação do microserviço de pedidos
- [app-invoices/invoices.MD](./app-invoices/invoices.MD): Documentação do microserviço de faturas

## Infraestrutura na AWS (IAC)

Para provisionar recursos na AWS (ex: S3, VPC, etc), utilize o Pulumi na pasta [infra](./infra). Siga as instruções do [README de infra](./infra/readme.MD).

## API Gateway (Kong) (API Gateway)

O Kong está disponível para rotear requisições entre os microserviços:

- Admin GUI: [http://localhost:8002](http://localhost:8002)
- Admin API: [http://localhost:8001](http://localhost:8001)
- Proxy: [http://localhost:8000](http://localhost:8000)

Consulte a documentação do Kong para criar rotas e plugins conforme necessário.

## Subindo os serviços

1. Suba a infraestrutura compartilhada (RabbitMQ, Jaeger, Kong) a partir do diretório raiz:
   ```sh
   docker-compose up -d
   ```
2. Suba o banco de dados de cada microserviço em seu respectivo diretório:
   ```sh
   cd app-orders && docker-compose up -d
   cd app-invoices && docker-compose up -d
   ```

## Documentação dos Microserviços
- [app-orders/orders.MD](./app-orders/orders.MD): Documentação do microserviço de pedidos
- [app-invoices/invoices.MD](./app-invoices/invoices.MD): Documentação do microserviço de faturas
- [infra/readme.MD](./infra/readme.MD): Documentação da infraestrutura AWS/Pulumi

---
