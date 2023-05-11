import { NextFunction, Request, Response } from "express";
import config from "config";
import PayStackService from "../../services/paystack";
import CartService from "../../services/cart.service";
import { IAddUserToRequest } from "../../interfaces/request.interface";
import { removeDuplicates } from "../../utils/helpers";
import VendorService from "../../services/vendor.service";
import UserService from "../../services/users.service";

class OrderWithPaystackController {
  public paystackService = new PayStackService();
  public cartService = new CartService();
  public vendorService = new VendorService();
  public userService = new UserService()
  public initializePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { customerEmail } = req.body;
    let cartValue = "";
    let prices = [];
    try {
      const cartData: any = await this.cartService.getUserCarts(
        Number((req as IAddUserToRequest).user?.id)
      );
      for (const item of cartData) {
        cartValue += `${item.name} x${item.product_count} `;
        prices.push(item.cart_price);
        const email: any = await this.vendorService.getVendorProfile(
          item.vendor_id,
          true
        );
        const user:any = await this.userService.findUserById(item.user_id)
        item.vendorEmail = email[0]?.email;
        item.user = user[0]
      }
      const totalAmount = prices.reduce((prev, curr) => prev + curr, 0);
      const { data } = await this.paystackService.initializeTransaction({
        email: customerEmail,
        amount: (totalAmount * 100).toString(),
        // callback_url: `http://localhost:8000/order/paystack/verify`,
        metadata: {
          data: JSON.stringify(cartData),
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
