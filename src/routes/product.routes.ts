import { Router } from "express";
import Route from "../interfaces/router.interface";
import ProductController from "../controller/product.controller";
import AuthorizeUserMiddleware from "../middlewares/authorizeUser.middleware";
import validateSchema from "../middlewares/validateSchema";
import { createProductSchema } from "../schema/product.schema";
import Permissions from "../middlewares/permissions.middleware";

class ProductRoute implements Route {
  public path = "/products";
  public router = Router();
  public productController = new ProductController();
  public authorizationMiddleware = new AuthorizeUserMiddleware();
  public createProductPermissionns = new Permissions(["VENDOR"]);
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validateSchema(createProductSchema),
      this.authorizationMiddleware.authorize,
      this.createProductPermissionns.checkPermissions,
      this.productController.createProduct
    );
  }
}

export default ProductRoute;
