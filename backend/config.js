import dotenv from 'dotenv';

dotenv.config();

export default {
  kafka: {
    clientId: 'my-app',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
};