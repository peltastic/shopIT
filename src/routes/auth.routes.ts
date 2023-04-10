import { Router } from "express";
import AuthController from "../controller/auth.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";
import { loginSchema } from "../schema/auth.schema";

class AuthRoute implements Route {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validateSchema(loginSchema),
      this.authController.loginHandler
    );
  }
}

export default AuthRoute