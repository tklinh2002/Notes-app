import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./src/routes/notes.js";
import authRouter from "./src/routes/authen.js";
import swaggerUi, { serve } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
