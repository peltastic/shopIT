import { Router } from "express";
import CartController from "../controller/cart.controller";
import Route from "../interfaces/router.interface";
import validateSchema from "../middlewares/validateSchema";
import { createCartSchema } from "../schema/cart.schema";
import Permissions from "../middlewares/permissions.middleware";
import AuthorizeUserMiddleware from "../middlewares/authorizeUser.middleware";

class CartRoute implements Route {
  public path = "/cart";
  public router = Router();
  public cartController = new CartController();
  public cartPermissions = new Permissions(["USER"]);
  public authorizationMiddleware = new AuthorizeUserMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      validateSchema(createCartSchema),
      this.authorizationMiddleware.authorize,
      this.cartPermissions.checkPermissions,
      this.cartController.createCartHandler
    );
    this.router.put(
      `${this.path}/increment/:cartId`,
      this.authorizationMiddleware.authorize,
      this.cartPermissions.checkPermissions,
      this.cartController.increaseCartCount
    );
    this.router.put(
      `${this.path}/decrement/:cartId`,
      this.authorizationMiddleware.authorize,
      this.cartPermissions.checkPermissions,
      this.cartController.decreaseCartCount
    );
    this.router.get(
      `${this.path}/user/:userId`,
      this.authorizationMiddleware.authorize,
      this.cartPermissions.checkPermissions,
      this.cartController.getUserCarts
    );
    this.router.get(
      `${this.path}/:cartId`,
      this.authorizationMiddleware.authorize,
      this.cartPermissions.checkPermissions,
      this.cartController.getCart
    );
    this.router.delete(
      `${this.path}/:cartId`,
      this.authorizationMiddleware.authorize,
      this.cartPermissions.checkPermissions,
      this.cartController.deleteCart
    );
  }
}

export default CartRoute;
