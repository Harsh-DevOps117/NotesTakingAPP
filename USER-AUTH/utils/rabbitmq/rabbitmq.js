import amqp from "amqplib";

let channel;

export async function getChannel() {
  if (channel) return channel;

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();

  await channel.assertExchange("AUTH_EVENTS", "topic", { durable: true });
  return channel;
}

export async function publishEvent(routingKey, payload) {
  const ch = await getChannel();

  ch.publish(
    "AUTH_EVENTS",
    routingKey,
    Buffer.from(JSON.stringify(payload)),
    { persistent: true }
  );
}
