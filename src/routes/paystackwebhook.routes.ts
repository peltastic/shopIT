import { Router } from "express";
import Route from "../interfaces/router.interface";
import PayStackWebhook from "../controller/webhooks/paystack.webhook";

class PayStackWebhookRoute implements Route {
  public path = "/paystack/webhook";
  public router = Router();
  public paystackWebook = new PayStackWebhook();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(this.path, this.paystackWebook.paystackWebhookHandler);
  }
}

export default PayStackWebhookRoute;
