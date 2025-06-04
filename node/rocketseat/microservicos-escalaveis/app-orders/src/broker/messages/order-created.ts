import { channels } from "../channels/index.ts";
import type { OrderCreatedMessage } from '../../../../contracts/messages/order-created-message.ts'

export function dispatchOrderCreated(data: OrderCreatedMessage) {
  channels.orders.sendToQueue('orders', Buffer.from(JSON.stringify(data)))
}