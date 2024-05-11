import express, { Application, Request, Response } from "express";
import { connectDB } from "./config/database";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import userRouter from "./router/users.router";
import jobOportunityRouter from "./router/businessOpportunity.router";
import matchRouter from "./router/match.router";
import loginRouter from "./router/auth.router";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    talentoTechApi: "/",
    users: "/api/users",
    bussinessOpportunity: "/api/businessOpportunity",
    match: "/api/match",
    auth: "/api/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // //Iniciar la base de datos
    connectDB();

    //Métodos Iniciales
    this.middlewares();

    // Rutas
    this.routes();
  }


  middlewares() {
    this.app.use(cors());

    // Lectura del Body
    this.app.use(express.json());

 
  }

  routes(): void {
    this.app.use(this.apiPaths.users, userRouter);
    this.app.use(this.apiPaths.bussinessOpportunity, jobOportunityRouter);
    this.app.use(this.apiPaths.match, matchRouter);
    this.app.use(this.apiPaths.auth, loginRouter);
    this.app.use(this.apiPaths.talentoTechApi,swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo por el puerto", this.port);
    });
  }
}

export default Server;
