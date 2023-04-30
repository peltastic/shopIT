import { IPaystackTransactionPayload } from "../../interfaces/paystack.interfaces";
import axios from "axios";
const paystackURL = "https://api.paystack.co";
import config from "config";

const test_header = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.get("paystack_secret_key")}`,
};

class PayStackService {
  public async initializeTransaction(body: IPaystackTransactionPayload) {
    return await axios.post(`${paystackURL}/transaction/initialize`, body, {
      headers: test_header,
    });
  }
  public async verifyTransaction(reference: string) {
    return await axios.get(`${paystackURL}/transaction/verify/${reference}`, {
      headers: test_header,
    });
  }
}

export default PayStackService;
