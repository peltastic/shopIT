import { NextFunction, Request, Response } from "express";
import { CreateCartInput } from "../schema/cart.schema";
import CartService from "../services/cart.service";
import { IAddUserToRequest } from "../interfaces/request.interface";

class CartController {
  public cartService = new CartService();
  public createCartHandler = async (
    req: Request<{}, {}, CreateCartInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, product_id, cart_price } = req.body;
    try {
      await this.cartService.createCart([
        name,
        price,
        cart_price,
        product_id,
        (req as IAddUserToRequest).user?.id as string,
      ]);
      return res.status(200).json({
        status: true,
        message: "Cart Created Successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  public increaseCartCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartId } = req.params;
    try {
      await this.cartService.increaseCartCount(Number(cartId));
      return res.status(200).json({
        status: true,
        message: "cart count increased successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  public decreaseCartCount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartId } = req.params;
    try {
      await this.cartService.decreaseCartCount(Number(cartId));
      const cart: any = await this.cartService.getSingleCart(Number(cartId));
      if (cart[0]?.product_count === 0) {
        await this.cartService.deleteCart(Number(cartId));
      }
      return res.status(200).json({
        status: true,
        message: "cart count decreased successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  public getUserCarts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;
    try {
      const cartData = await this.cartService.getUserCarts(Number(userId));
      return res.status(200).json({
        status: true,
        data: cartData,
      });
    } catch (error) {
      next(error);
    }
  };
  public getCart = async (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;
    try {
      const cartData = await this.cartService.getSingleCart(Number(cartId));
      return res.status(200).json({
        status: true,
        data: cartData,
      });
    } catch (error) {
      next(error);
    }
  };
  public deleteCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartId } = req.params;
    try {
      await this.cartService.deleteCart(Number(cartId));
      return res.status(200).json({
        status: true,
        message: "cart deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CartController;
