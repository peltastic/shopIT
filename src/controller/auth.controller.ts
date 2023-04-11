import { Request, Response, NextFunction } from "express";
import { LoginInput } from "../schema/auth.schema";
import UserService from "../services/users.service";
import HttpException from "../exceptions/HttpException";
import Jwt from "../utils/jwt";
import bcrypt from "bcrypt";

class AuthController {
  public userService = new UserService();
  public jwt = new Jwt();
  public loginHandler = async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    try {
      const user: any = await this.userService.findUserByEmail(email);
      if (user?.length === 0) {
        throw new HttpException(400, "Inavlid Email or Password");
      }
      const passwordIsValid = await bcrypt.compare(password, user[0]?.password);
      if (!passwordIsValid) {
        console.log(passwordIsValid);
        throw new HttpException(400, "Invalid Email or Password");
      }
      const payload = {
        email: user[0]?.email,
        id: user[0]?.id,
        role: user[0]?.roles
      }
      const token = this.jwt.signJwt(payload);
      return res.status(200).json({
        status: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
