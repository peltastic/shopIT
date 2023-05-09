import { NextFunction, Request, Response } from "express";
import { verifyPayStackWebhookEvent } from "../../utils/paystack";
import HttpException from "../../exceptions/HttpException";
import UserService from "../../services/users.service";


class PayStackWebhook {
  public userService = new UserService()  
  public paystackWebhookHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const eventData = req.body;
    const signature = req.headers["x-paystack-signature"] as string;
    try {
      if (!verifyPayStackWebhookEvent(eventData, signature)) {
        throw new HttpException(400, "Error Verifying Paystack Webhook Event Data");
      }
      
      console.log(eventData)
      if (eventData.event === "charge.success") {
        const transactionId = eventData.data.id;
        // Process the successful transaction to maybe fund wallet and update your WalletModel
        console.log(eventData.data.metadata);
        const emails = await this.userService.getVendorUserEmails(eventData.data?.metadata?.vendorIds)
        console.log(emails, "csmdsm")
      }

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default PayStackWebhook;
