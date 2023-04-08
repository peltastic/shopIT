import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email(),
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password too Short - should be min of 6 chars "),
    name: string({
      required_error: "User Name is Required",
    }),
  }),
});

export const verifyUserSchema = object({
  params: object({
    code: string(),
    id: string(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
