import { Request, Response, NextFunction } from "express";
import { roles } from "../utils/constants";
import HttpException from "../exceptions/HttpException";
import { IAddUserToRequest } from "../interfaces/request.interface";

class Permissions {
  private permissions: string[];
  constructor(permissions: string[]) {
    this.permissions = permissions;
  }

  public checkPermissions = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const hasPermission = (req as IAddUserToRequest).user?.role.some((role: any) =>
    this.permissions.includes(role)
    );

    if (hasPermission) {
      return next();
    }
    next(new HttpException(403, "Forbidden to access this resource"));
  };
}

export default Permissions;
