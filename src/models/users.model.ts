import { User } from "../interfaces/users.interfaces";
import { execute } from "../utils/db";

class UserModel {
  private tableName: string = "users";

  public async getUserByEmail(email: string) {
    try {
      let conditions: {}[] = [];
      conditions.push(email);
      let query = `SELECT email, id, passwords, roles, verified FROM ${this.tableName} WHERE email = ?`;
      return execute<User>(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }

  public async findUserById(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async findVendorUserEmail(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `SELECT email FROM ${this.tableName} WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async getUserVerificationCred(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `SELECT email, verified, verification_code FROM ${this.tableName} WHERE id = ?`;
      return execute<User>(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async verifyUser(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `UPDATE ${this.tableName} SET verified = true WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async createNewUser(data: (string | string[])[]) {
    try {
      let conditions: {}[] = [];
      for (const el of data) {
        conditions.push(el);
      }
      let query = `INSERT INTO ${this.tableName} (email, passwords, names, verification_code, roles) 
      VALUES (?, ?, ?, ?, ?)`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async updateVendor(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `UPDATE ${this.tableName} SET roles = '["VENDOR"]' WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default UserModel;
