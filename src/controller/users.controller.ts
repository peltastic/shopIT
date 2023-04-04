import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UserService from "../services/users.service";
import HttpException from "../exceptions/HttpException";

class UsersController {
  public userService = new UserService();
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;    try {
      const emailIsRegistered: any = await this.userService.findUserByEmail(email);
      if (!(emailIsRegistered.length === 0)) {
        throw new HttpException(409, "email already exixts");
      }
      const hashedPassword = await bcrypt.hash(password, 14);
      const user = await this.userService.createUser([email, hashedPassword, name]);
      return res.status(201).json({
        status: true,
        message: "User Created Successfully",
      });
    } catch (err) {
      next(err);
    }
  };
}

export default UsersController;
