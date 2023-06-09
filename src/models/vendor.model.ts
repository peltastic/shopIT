import { IVendor } from "../interfaces/vendors.interface";
import { execute } from "../utils/db";

class VendorModel {
  private tableName: string = "vendor_profiles";

  public async createNewVendor(data: any) {
    try {
      let conditions: {}[] = [];
      for (const el in data) {
        console.log(data[el]);
        conditions.push(data[el]);
      }
      let query = `INSERT INTO ${this.tableName} (user_id, vendor_name, addresses, email) VALUES(?, ?, ?, ?)`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async findVendor(id: number, returnOnlyEmail?: boolean) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      const returnType = returnOnlyEmail ? `email` : `*`
      let query = `SELECT ${returnType} FROM ${this.tableName} WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async deleteVendor(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async getVendorBalance(email: string) {
    try {
      let conditions: {}[] = [];
      conditions.push(email);
      let query = `SELECT amount_earned FROM ${this.tableName} WHERE email = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async updateVendorBalance(id: number, price: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `UPDATE ${this.tableName} SET amount_earned = amount_earned + ${price}`;
      return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async updateVendorProductsCount(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `UPDATE ${this.tableName} SET vendor_products_count = vendor_products_count + 1`;
      return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default VendorModel;
