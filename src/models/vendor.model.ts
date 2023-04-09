import { IVendor } from "../interfaces/vendors.interface";
import { execute } from "../utils/db";

class VendorModel {
  private tableName: string = "vendor_profile";

  public async createNewVendor(data: any) {
    try {
        let conditions: {}[] = [];
        for (const el in data) {
          console.log(data[el])
            conditions.push(data[el])
        }
        let query = `INSERT INTO ${this.tableName} (user_id, vendor_name, address) VALUES(?, ?, ?)`
        return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default VendorModel;
