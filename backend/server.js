import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./src/routes/notes.js";
import authRouter from "./src/routes/authen.js";
import swaggerUi, { serve } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Kafka } from "kafkajs";
import Redis from "redis";
import config from "./config.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//kafka setup
const kafka = new Kafka(config.kafka);
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "note-group" });
//redis setup
const redis = new Redis(config.redis);

// connect to kafka and redis
async function connectServices() {
  await producer.connect();
  await consumer.connect();
  await redis.connect();
}
connectServices().catch(console.error);

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note API",
      version: "1.0.0",
      description: "API for managing notes",
    },
    basePath: "/api",
    schemes: ["http"],
    securityDefinitions: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Notes",
        description: "API for managing notes",
      },
      {
        name: "Authentication",
        description: "API for managing authentication",
      },
    ],
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Define routes
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

// Example Kafka producer
app.post("/produce", async (req, res) => {
  try {
    await producer.send({
      topic: "test-topic",
      messages: [{ value: JSON.stringify(req.body) }],
    });
    res.status(200).json({ message: "Message sent to Kafka" });
  } catch (error) {
    res.status(500).json({ error: "Error sending message to Kafka" });
  }
});

// Example Redis cache
app.get("/cache/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const value = await redisClient.get(key);
    if (value) {
      res.json({ [key]: value });
    } else {
      res.status(404).json({ message: "Key not found in cache" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error accessing Redis cache" });
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await producer.disconnect();
  await consumer.disconnect();
  await redisClient.quit();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
