import { NextFunction, Request, Response } from "express";
import { verifyPayStackWebhookEvent } from "../../utils/paystack";
import HttpException from "../../exceptions/HttpException";
import VendorService from "../../services/vendor.service";
import { sendMultipleMailToVendors } from "../../utils/mailer";
import OrderService from "../../services/orders.service";
import CartService from "../../services/cart.service";

class PayStackWebhook {
  public vendorService = new VendorService();
  public orderService = new OrderService()
  public cartService = new CartService()
  public paystackWebhookHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const eventData = req.body;
    const signature = req.headers["x-paystack-signature"] as string;
    try {
      if (!verifyPayStackWebhookEvent(eventData, signature)) {
        throw new HttpException(
          400,
          "Error Verifying Paystack Webhook Event Data"
        );
      }

      console.log(eventData);
      if (eventData.event === "charge.success") {
        const transactionId = eventData.data.id;
        // Process the successful transaction to maybe fund wallet and update your WalletModel
        // console.log(eventData.data.metadata);
        // const emails = await this.vendorService.getVendorUserEmails(
        //   JSON.parse(eventData.data?.metadata?.vendorIds)
        // );
        console.log(JSON.parse(eventData.data?.metadata?.data), "csmdsm");
        const data = JSON.parse(eventData.data?.metadata?.data)
        sendMultipleMailToVendors(data)
        await this.orderService.createNewOrderRecords(data)
        await this.cartService.deleteMultipleCarts(data)
      }

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default PayStackWebhook;
