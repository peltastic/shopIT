import { NextFunction, Request, Response } from "express";
import config from "config";
import PayStackService from "../../services/paystack";
import { v4 as uuidv4 } from "uuid";

class OrderWithPaystackController {
  public paystackService = new PayStackService();
  public initializePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { customerEmail, amount, vendorEmail } = req.body;
    // const transaction_reference = uuidv4();
    try {
      const { data } = await this.paystackService.initializeTransaction({
        email: customerEmail,
        amount: (Number(amount) * 100).toString(),
        callback_url: `http://localhost:8000/order/paystack/verify`
      });
      return res.status(200).json({ data, vendorEmail });
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
    console.log("start");
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
