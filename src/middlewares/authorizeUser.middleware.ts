import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import Jwt from "../utils/jwt";
import { IJwtExpectedPayload } from "../interfaces/jwt.interfaces";

class AuthorizeUser {
  public jwt = new Jwt();
  private catchTokenExpiredError = (
    err: any,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof TokenExpiredError) {
      next(new HttpException(401, "Unauthorized ! Access Token has expired!"));
    }
    next(new HttpException(401, "Unauthorized"));
  };
  public authorize = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);
    if (!authHeader?.startsWith("Bearer ")) {
      next(new HttpException(401, "Unauthorized"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      next(new HttpException(403, "No token Provided!"));
    }
    let decoded;
    try {
      decoded = this.jwt.verifyJwt<IJwtExpectedPayload>(token);
      res.locals.payload = decoded;
      next();
    } catch (err) {
      if (err) {
        return this.catchTokenExpiredError(err, res, next);
      }
    }
  };
  // public isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  //   const role = res.locals.payload.roles;
  //   if (role === roles.ADMIN) {
  //     next();
  //   }
  //   next(new HttpException(403, "Forbidden to access this resource"));
  // };
  // public isVendor = async (req: Request, res: Response, next: NextFunction) => {
  //   const role = res.locals.payload.role;
  //   if (role === roles.VENDOR) {
  //     next();
  //   }
  //   next(new HttpException(403, "Forbidden to access this resource"));
  // };
  // public isUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const role = res.locals.payload.role;
  //   if (role === roles.USER) {
  //     next();
  //   }
  //   next(new HttpException(403, "Forbidden to access this resource"));
  // };
}

export default AuthorizeUser;
