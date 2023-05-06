import { NextFunction, Request, Response } from "express";
import config from "config";
import PayStackService from "../../services/paystack";
import CartService from "../../services/cart.service";
import { IAddUserToRequest } from "../../interfaces/request.interface";

class OrderWithPaystackController {
  public paystackService = new PayStackService();
  public cartService = new CartService();
  public initializePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { customerEmail} = req.body;
    let cartValue = "";
    let prices = [];
    let cartIds = [];
    const vendorIds = [];
    try {
      const cartData: any = await this.cartService.getUserCarts(
        Number((req as IAddUserToRequest).user?.id)
      );
      for (const item of cartData) {
        cartValue += `${item.name} x${item.product_count} `;
        prices.push(item.cart_price);
        cartIds.push(item.id);
        vendorIds.push(item.vendor_id);
      }
      const totalAmount = prices.reduce((prev, curr) => prev + curr, 0);
      console.log(cartIds, vendorIds, cartValue, totalAmount)
      const { data } = await this.paystackService.initializeTransaction({
        email: customerEmail,
        amount: (totalAmount * 100).toString(),
        // callback_url: `http://localhost:8000/order/paystack/verify`,
        metadata: {
          cartIds: JSON.stringify(cartIds),
          vendorIds: JSON.stringify(vendorIds),
          custom_fields: [
            {
              display_name: "Cart Items",
              variable_name: "cart_items",
              value: cartValue,
            },
          ],
        },
      });
      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
  public verifyPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { trxref } = req.query;
    // console.log("start");
    try {
      const { data } = await this.paystackService.verifyTransaction(
        trxref as string
      );
      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderWithPaystackController;
