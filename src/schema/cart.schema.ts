import { number, object, string, TypeOf } from "zod";

export const createCartSchema = object({
  body: object({
    name: string({
      required_error: "Cart product name is required",
    }),
    price: number({
      required_error: "Price is Required",
    }),
    product_id: string({
      required_error: "Product Id is required",
    }),
    user_id: string({
      required_error: "User Id is Required",
    }),
  }),
});

export type CreateCartInput = TypeOf<typeof createCartSchema>["body"];