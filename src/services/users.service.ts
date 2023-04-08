import { User } from "../interfaces/users.interfaces";
import UserModel from "../models/users.model";

class UserService {
  public users = new UserModel();
  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.users.getUserByEmail(email);
    if (user) return user;
    return null;
  }
  public async findUserVerificationCredById(id: number): Promise<User | null> {
    const user = await this.users.getUserVerificationCred(id);
    if (user) return user;
    return null;
  }
  public async createUser(data: string[]) {
    await this.users.createNewUser(data);
  }
  public async verifyUser(id: number) {
    await this.users.verifyUser(id);
  }
}

export default UserService;
