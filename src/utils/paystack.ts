import crypto from "crypto"
import config from "config"


const API_SECRET_KEY = config.get<string>("paystack_secret_key");

export function verifyPayStackWebhookEvent(eventData: any, signature: string): boolean {
    const hmac = crypto.createHmac('sha512', API_SECRET_KEY);
    const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
    return expectedSignature === signature;
}