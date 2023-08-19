import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UserService from "../services/users.service";
import HttpException from "../exceptions/HttpException";
import sendMail from "../utils/mailer";
import config from "config";
import { generateCode } from "../utils/code";
import { CreateUserInput, VerifyUserInput } from "../schema/users.schema";


class UsersController {
  public userService = new UserService();
  public createUser = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const name: string = req.body.name;
    const verificationCode = generateCode();
    try {
      const emailIsRegistered: any = await this.userService.findUserByEmail(
        email
      );
      console.log(emailIsRegistered.rows)
      if (!(emailIsRegistered.rows.length === 0)) {
        throw new HttpException(409, "email already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 14);
      console.log(hashedPassword)
      await this.userService.createUser([email, hashedPassword, name, verificationCode.toString(), JSON.stringify(["USER"])] );
      sendMail({
        from: config.get("email"),
        to: email,
        subject: "Verification Code",
        text: `Thanks for signing up!, your email verification code is ${verificationCode.toString()}`,
      });
      return res.status(201).json({
        status: true,
        message: "User Created Successfully",
      });
    } catch (err) {
      next(err);
    }
  };
  public verifyUser = async (req: Request<VerifyUserInput>, res: Response, next: NextFunction) => {
    const { code, id } = req.params;
    try {
      const user: any = await this.userService.findUserVerificationCredById(Number(id));
      if (!user) {
        throw new HttpException(400, "Could Not verifyUser");
      }
      if ( user[0].verified) {
        throw new HttpException(400, "User is Already Verified")
      }
      if (Number(user[0].verification_code) === Number(code) ) {
        this.userService.verifyUser(Number(id))
        return res.status(200).json({
          status: true,
          message: "User Verified"
        });
      }
      return res.status(400).json({
        status: false,
        message: "Could Not Verify User"
      })
    } catch (err) {
      next(err);
    }
  };
}

export default UsersController;
