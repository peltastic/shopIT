import { User } from "../interfaces/users.interfaces";
import { execute } from "../utils/db";

class UserModel {
  private tableName: string = "users";

  public async getUserByEmail(email: string) {
    try {
      let conditions: {}[] = [];
      conditions.push(email);
      let query = `SELECT email FROM ${this.tableName} WHERE email = ?`;
      return execute<User>(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async createNewUser(data: string[]) {
    try {
      let conditions: {}[] = [];
      for (const el of data) {
        conditions.push(el);
      }
      let query = `INSERT INTO ${this.tableName} (email, password, name) 
      VALUES (?, ?, ?)`
      return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default UserModel;
