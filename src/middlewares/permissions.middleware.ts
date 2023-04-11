import { Request, Response, NextFunction } from "express";
import { roles } from "../utils/constants";
import HttpException from "../exceptions/HttpException";

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
    const allPermissions = roles;
    const hasPermission = this.permissions.some((role) =>
      allPermissions.includes(role)
    );
    console.log(hasPermission);
    if (hasPermission) {
      next();
    }
    next(new HttpException(403, "Forbidden to access this resource"));
  };
}

export default Permissions;
