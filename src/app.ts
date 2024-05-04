import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/database";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import cors from "cors";
import userRouter from "./router/users.router";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app: Application = express();

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Ruta de User
app.use("/users", userRouter);

// Ruta de inicio
//Implementar swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Implementar cors
app.use(cors());

// Puerto en el que se ejecutará el servidor
const PORT = Number(process.env.PORT) || 3000;

//Iniciar la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
