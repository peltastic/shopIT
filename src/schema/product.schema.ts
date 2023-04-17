import { object, string, TypeOf } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: "Name is Required",
    }),
    description: string({
      required_error: "Description is Required",
    }),
    price: string({
      required_error: "Price of Product is Required",
    }),
    category: string(),
    image_urls: string().array().nonempty(),
    vendor_id: string(),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"]
