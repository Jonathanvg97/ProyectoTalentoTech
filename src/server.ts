import express, { Application } from "express";
import { connectDB } from "./config/database";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import userRouter from "./routes/users.router";
import bussinessOpportunityRouter from "./routes/businessOpportunity.router";
import matchRouter from "./routes/match.router";
import loginRouter from "./routes/auth.router";
import notificationRouter from "./routes/notificationMatch.router";
import path from "path"; // Importamos la librería 'path' para manejar rutas de archivos

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    talentoTechApi: "/api/docs",
    users: "/api/users",
    bussinessOpportunity: "/api/businessOpportunity",
    match: "/api/match",
    auth: "/api/auth",
    notificationMatch: "/api/notificationMatch",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Iniciar la base de datos
    connectDB();

    // Métodos Iniciales
    this.middlewares();

    // Rutas
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(this.apiPaths.users, userRouter);
    this.app.use(
      this.apiPaths.bussinessOpportunity,
      bussinessOpportunityRouter
    );
    this.app.use(this.apiPaths.match, matchRouter);
    this.app.use(this.apiPaths.auth, loginRouter);
    this.app.use(this.apiPaths.notificationMatch, notificationRouter);

    // Ruta para servir Swagger UI
    this.app.use(
      this.apiPaths.talentoTechApi,
      swaggerUi.serve, // Middleware para servir archivos estáticos de Swagger-UI
      swaggerUi.setup(swaggerSpec) // Configuración de Swagger UI
    );

    // Ruta para servir Swagger UI CSS
    this.app.use(
      "/public/css", // Ruta pública para el archivo CSS de Swagger UI
      express.static(path.join(__dirname, "../node_modules/swagger-ui-dist")) // Middleware para servir archivos estáticos
    );
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo por el puerto", this.port);
    });
  }
}

export default Server;
