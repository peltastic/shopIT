import { TypeOf, object, string } from "zod";

export const initializePaystackPaymentSchema = object({
  body: object({
    customerEmail: string({
      required_error: "Customer Email is Required",
    }).email(),
    vendorEmail: string({
      required_error: "Vendor Email is Required",
    }).email(),
    userId: string({
      required_error: "User Id is Required",
    }),
  }),
});

export type InitializePaystackPaymentInput = TypeOf<
  typeof initializePaystackPaymentSchema
>["body"];
