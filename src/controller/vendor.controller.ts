import {NextFunction, Request, Response} from "express"
import { CreateVendorInput } from "../schema/vendor.schema"


class VendorController {
    public createVendor = async (req: Request<{}, {}, CreateVendorInput>, res: Response, next: NextFunction) => {
        const body = req.body
    }
    
}

export default VendorController