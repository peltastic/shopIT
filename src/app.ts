// import cors from "cors"
import express, { Application } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import * as dbConnection from "./utils/db";
import Routes from "./interfaces/router.interface";

class App {
  public app: Application;
  public port: string | number;
  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.env = process.env.NODE_ENV === "production" ? true : false;
    dbConnection.init();
    this.initializeMiddlewares();
    this.initializeRoutes(routes)
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use(route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
