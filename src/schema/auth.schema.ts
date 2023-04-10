import {object, string, TypeOf} from "zod"

export const loginSchema = object({
    body: object({
        email: string({
            required_error: "Invalid Email or Passowrd"
        }).email(),
        password: string({
            required_error: "Invalid Email or Password"
        }).min(6, "Invalid Email or Password")
    })
})

export type LoginInput = TypeOf<typeof loginSchema>["body"]