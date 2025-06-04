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

---
