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
  public async createUser(data: (string | string[])[]) {
    await this.users.createNewUser(data);
  }
  public async verifyUser(id: number) {
    await this.users.verifyUser(id);
  }
  public async updateVendor(id: number) {
    await this.users.updateVendor(id);
  }
  public async getVendorUserEmails(ids: number[]) {
    console.log(ids, "ids")
    const emails = [];
    for (const el of ids) {
      const email: any = await this.users.findVendorUserEmail(el);
      emails.push(email[0]?.email);
    }
    return emails;
  }
}

export default UserService;
