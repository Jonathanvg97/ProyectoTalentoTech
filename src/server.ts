import createApp from "../app";
import { connectDB } from "./config/database";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

//Iniciar la base de datos
connectDB();

// Obtener la instancia de la aplicación Express
const app = createApp();

// Puerto en el que se ejecutará el servidor
const PORT = Number(process.env.PORT) || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
