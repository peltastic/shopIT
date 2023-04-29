import { Router } from "express";
import OrderWithPaystackController from "../controller/orders/paystack.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";

class OrderRoute implements Route {
  public path = "/order";
  public router = Router();
  public orderPaystackController = new OrderWithPaystackController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/paystack`,
      this.orderPaystackController.initializePayment
    );
  }
}

export default OrderRoute;
