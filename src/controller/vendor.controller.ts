import { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../schema/vendor.schema";
import VendorService from "../services/vendor.service";
import UserService from "../services/users.service";

class VendorController {
  public vendorService = new VendorService();
  public userService  = new UserService()
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
      await this.userService.updateVendor(Number(user_id));
      return res.status(201).json({
        status: true,
        Message: "vendor created successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  public getVendorProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      const {id} = req.params
      try {
        const profile = await this.vendorService.getVendorProfile(Number(id))
        return res.status(200).json({
          status: true,
          data: profile
        })
      } catch (error) {
        next(error)
      }
    }
  public deleteVendorProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
      const {userId} = req.params
      try {
        await this.vendorService.deleteVendor(Number(userId))
        return res.status(200).json({
          status: true,
        message: "Profile deleted successfully"
      })
    } catch (error) {
      next(error)
    }
  }
}

export default VendorController;
