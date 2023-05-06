import { Router } from "express";
import OrderWithPaystackController from "../controller/orders/paystack.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";
import AuthorizeUserMiddleware from "../middlewares/authorizeUser.middleware";

class OrderRoute implements Route {
  public path = "/order";
  public router = Router();
  public orderPaystackController = new OrderWithPaystackController();
  public authorizationMiddleware = new AuthorizeUserMiddleware()
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/paystack`,
      this.authorizationMiddleware.authorize,
      this.orderPaystackController.initializePayment
    );
    this.router.get(
      `${this.path}/paystack/verify`,
      this.orderPaystackController.verifyPayment
    );
  }
}

export default OrderRoute;
