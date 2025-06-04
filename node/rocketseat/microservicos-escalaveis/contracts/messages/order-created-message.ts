export interface OrderCreatedMessage {
    orderId: string
    amount: number
    customer: {
      id: string
    },
  }