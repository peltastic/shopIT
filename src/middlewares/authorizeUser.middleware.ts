import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import Jwt from "../utils/jwt";
import { IJwtExpectedPayload } from "../interfaces/jwt.interfaces";
import { roles } from "../utils/constants";

class AuthorizeUser {
  public jwt = new Jwt();
  private catchTokenExpiredError = (err: any, res: Response) => {
    if (err instanceof TokenExpiredError) {
      throw new HttpException(401, "Unauthorized ! Access Token has expired!");
    }
    throw new HttpException(401, "Unauthorized");
  };
  public authorize = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);
    if (!authHeader?.startsWith("Bearer ")) {
      throw new HttpException(401, "Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    if (token) {
      throw new HttpException(403, "No token Provided!");
    }
    let decoded;
    try {
      decoded = this.jwt.verifyJwt<IJwtExpectedPayload>(token);
    } catch (err) {
      if (err) {
        return this.catchTokenExpiredError(err, res);
      }
      res.locals.payload = decoded;
      next();
    }
  };
  public isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.payload.role;
    if (role === roles.ADMIN) {
      next();
    }
    throw new HttpException(403, "Forbidden to access this resource");
  };
  public isVendor = async (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.payload.role;
    if (role === roles.VENDOR) {
      next();
    }
    throw new HttpException(403, "Forbidden to access this resource");
  };
  public isUser = async (req: Request, res: Response, next: NextFunction) => {
    const role = res.locals.payload.role;
    if (role === roles.USER) {
      next();
    }
    throw new HttpException(403, "Forbidden to access this resource");
  };
}

export default AuthorizeUser;
