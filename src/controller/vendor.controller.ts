import { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../schema/vendor.schema";
import VendorService from "../services/vendor.service";

class VendorController {
  public vendorService = new VendorService();
  public createVendor = async (
    req: Request<{}, {}, CreateVendorInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { user_id, vendor_name, address } = req.body;
    try {
      await this.vendorService.createVendor({
        user_id: Number(user_id),
        vendor_name,
        address,
      });
      res.status(201).json({
        status: true,
        Message: "vendor created successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default VendorController;
