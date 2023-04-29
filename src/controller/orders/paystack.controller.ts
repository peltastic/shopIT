import { NextFunction, Request, Response } from "express";
import config from "config";
import PayStackService from "../../services/paystack";

class OrderWithPaystackController {
  public paystackService = new PayStackService();
  public initializePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { customerEmail, amount, vendorEmail } = req.body;
    try {
      const {data} = await this.paystackService.initializeTransaction({
        email: customerEmail,
        amount: (Number(amount) * 100).toString(),
        callback_url: "",
        transaction_reference: ""
      });

      return res.status(200).json({data, vendorEmail});
    } catch (error) {
      next(error);
    }
  };
  public verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    const {reference} = req.params
    try {
            const data = await this.paystackService.verifyTransaction(reference)
    } catch (error) {
        next(error)
    }

  } 

}


export default OrderWithPaystackController;
