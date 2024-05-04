import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger";
import cors from "cors";
import userRouter from "./src/router/users.router";

// Esta función crea y configura la aplicación Express
export default function createApp(): Application {
  // Crear una instancia de la aplicación Express
  const app: Application = express();

  // Middleware para analizar solicitudes JSON
  app.use(bodyParser.json());

  // Ruta de User
  app.use("/api/users", userRouter);

  // Ruta de inicio
  //Implementar swagger
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Implementar cors
  app.use(cors());

  return app;
}