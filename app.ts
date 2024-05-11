import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger";
import cors from "cors";
import userRouter from "./src/router/users.router";
import jobOportunityRouter from "./src/router/businessOpportunity.router";
import matchRouter from "./src/router/match.router";
import loginRouter from "./src/router/auth.router";

// Esta función crea y configura la aplicación Express
export default function createApp(): Application {
  // Crear una instancia de la aplicación Express
  const app: Application = express();

  // Middleware para analizar solicitudes JSON
  app.use(bodyParser.json());

  // Ruta de User
  app.use("/api/users", userRouter);

  // Ruta de Oportunidades
  app.use("/api/businessOpportunity", jobOportunityRouter);

  // Ruta de Matches
  app.use("/api/match", matchRouter);

  // Ruta para iniciar sesión
  app.use("/api/auth", loginRouter);

  // Ruta de inicio
  //Implementar swagger
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Implementar cors
  app.use(cors());

  return app;
}
