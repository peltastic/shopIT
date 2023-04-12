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
      let query = `INSERT INTO ${this.tableName} (user_id, vendor_name, addresses) VALUES(?, ?, ?)`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async findVendor(id: number) {
    try {
      let conditions: {}[] = []
      conditions.push(id)
      let query = `SELECT * FROM ${this.tableName} WHERE id = ?`
      return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async deleteVendor(id: number) {
    try {
      let conditions: {}[] = []
      conditions.push(id)
      console.log(id, conditions)
      let query = `DELETE FROM ${this.tableName} WHERE id = ?`
      return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default VendorModel;
