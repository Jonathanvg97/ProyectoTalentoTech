import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/database";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app: Application = express();

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Ruta de inicio
app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, mundoooooooooooooooo 9999!");
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

//Iniciar la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
