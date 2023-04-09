import {Router} from "express"
import VendorController from "../controller/vendor.controller"
import Route from "../interfaces/router.interface"
import validateSchema from "../middlewares/validateSchema"
import { createVendorSchema } from "../schema/vendor.schema"

class VendorRoute implements Route {
    public path = "/vendor"
    public router = Router()
    public vendorController = new VendorController()
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/create`, validateSchema(createVendorSchema), this.vendorController.createVendor)
    }
}

export default VendorRoute