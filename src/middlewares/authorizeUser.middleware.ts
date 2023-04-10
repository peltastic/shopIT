import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, Secret } from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import Jwt from "../utils/jwt";
import { IJwtExpectedPayload } from "../interfaces/jwt.interfaces";

class AuthorizeUser {
  public jwt = new Jwt();
  private catchTokenExpiredError = (err: any, res: Response) => {
    if (err instanceof TokenExpiredError) {
      throw new HttpException(401, "Unauthorized ! Access Token has expired!");
    }
    throw new HttpException(401, "Unauthorized");
  };
  public authorize = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);
    if (!authHeader?.startsWith("Bearer ")) {
      throw new HttpException(401, "Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    if (token) {
        throw new HttpException(403, "No token Provided!")
    }
    let decoded
    try {
    decoded = this.jwt.verifyJwt<IJwtExpectedPayload>(token);
    } catch (err) {
        if (err) {
            return this.catchTokenExpiredError(err, res)
        }
        req.id = decoded?.id
        req.role  = decoded?.role
        next()
    }
  };
  public isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
  }
}

export default AuthorizeUser;
