import { Router } from "express";
import UsersController from "../controller/users.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";
import { createUserSchema, verifyUserSchema } from "../schema/users.schema";

class UserRoute implements Route {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validateSchema(createUserSchema),
      this.usersController.createUser
    );
    this.router.post(
      `${this.path}/verify/:id/:code`,
      validateSchema(verifyUserSchema),
      this.usersController.verifyUser
    );
  }
}
export default UserRoute;
