import { IPaystackTransactionPayload } from "../../interfaces/paystack.interfaces";
import axios from "axios";
const paystackURL = "https://api.paystack.co";
import config from "config";

class PayStackService {
  public async initializeTransaction(body: IPaystackTransactionPayload) {
    return await axios.post(`${paystackURL}/transaction/initialize`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.get("paystack_secret_key")}`,
      },
    });
  }
  public async verifyTransaction(reference: string) {
    return await axios.post(`${paystackURL}/transaction/verify/:${reference}`);
  }
}

export default PayStackService;
