import { Router } from "express";
import VendorController from "../controller/vendor.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";
import { createVendorSchema } from "../schema/vendor.schema";
import AuthorizeUser from "../middlewares/authorizeUser.middleware";

class VendorRoute implements Route {
  public path = "/vendor";
  public router = Router();
  public vendorController = new VendorController();
  public authorization = new AuthorizeUser();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validateSchema(createVendorSchema),
      this.authorization.authorize,
      this.vendorController.createVendor
    );
  }
}

export default VendorRoute;
