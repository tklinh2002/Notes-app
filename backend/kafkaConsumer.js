import { Kafka } from 'kafkajs';
import config from './config.js';

const kafka = new Kafka(config.kafka);
const consumer = kafka.consumer({ groupId: 'my-group' });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
      // Process the message here
    },
  });
}

runConsumer().catch(console.error);