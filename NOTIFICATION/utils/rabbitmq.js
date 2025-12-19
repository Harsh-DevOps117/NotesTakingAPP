import amqp from "amqplib";
import logger from "../utils/logger/logger.js";

let channel;

const EXCHANGE_NAME = "AUTH_EVENTS";
const QUEUE_NAME = "AUTH_LOGIN_QUEUE";

export async function consumeMsg(routingKey, callback) {
  if (!channel) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", {
      durable: true
    });

    await channel.assertQueue(QUEUE_NAME, {
      durable: true
    });

    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, routingKey);

    logger.info("RabbitMQ consumer connected");
  }

  channel.consume(QUEUE_NAME, (msg) => {
    if (!msg) return;

    const payload = JSON.parse(msg.content.toString());
    callback(payload);
    channel.ack(msg);
  });

  logger.info(`Subscribed to ${routingKey}`);
}
