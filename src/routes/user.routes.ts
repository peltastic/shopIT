import { Request, Response, Router } from "express";
import UsersController from "../controller/users.controller";
import Route from "../interfaces/router.interface";

class UserRoute implements Route {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.usersController.createUser);
  }
}
export default UserRoute;
