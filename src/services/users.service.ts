import { User } from "../interfaces/users.interfaces";
import UserModel from "../models/users.model";

class UserService {
  public users = new UserModel();
  public async findUserByEmail(email: string): Promise<User | User[] | null> {
    const user = await this.users.getUserByEmail(email);
    if (user) return user;
    return null;
  }
  public async createUser(data: string[]) {
    const user = await this.users.createNewUser(data);
    console.log(user);
  }
}

export default UserService;
