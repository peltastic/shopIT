import { Router } from "express";
import VendorController from "../controller/vendor.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";
import { createVendorSchema } from "../schema/vendor.schema";
import AuthorizeUserMiddleWare from "../middlewares/authorizeUser.middleware";
import Permissions from "../middlewares/permissions.middleware";

class VendorRoute implements Route {
  public path = "/vendor";
  public router = Router();
  public vendorController = new VendorController();
  public authorizationMiddleware = new AuthorizeUserMiddleWare();
  public deleteVendorPermissions = new Permissions(["VENDOR", "ADMIN"]);
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validateSchema(createVendorSchema),
      this.authorizationMiddleware.authorize,
      this.vendorController.createVendor
    );
    this.router.get(
      `${this.path}/shop/:id`,
      this.vendorController.getVendorProfile
    );
    this.router.delete(
      `${this.path}/delete/:userId`,
      this.authorizationMiddleware.authorize,
      this.deleteVendorPermissions.checkPermissions,
      this.vendorController.deleteVendorProfile
    );
  }
}

export default VendorRoute;
