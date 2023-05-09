import {object, string, TypeOf} from "zod"

export const createVendorSchema = object({
    body: object({
        user_id: string({
            required_error: "User Id is Required"
        }),
        vendor_name: string({
            required_error: "Vendor Name is Required",
        }),
        address: string({
            required_error: "Address is Required"
        }),
        email: string({
            required_error: "Email is Required"
        }).email()
    })
})

export type CreateVendorInput = TypeOf<typeof createVendorSchema>["body"]