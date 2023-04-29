export interface IPaystackTransactionPayload {
    email: string,
    amount: string
    callback_url: string
    transaction_reference: string
}