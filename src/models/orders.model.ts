import { execute } from "../utils/db";

class OrderModel {
 public tableName: string = "orders"
 public async createOrderRecords(data: (string | number) []) {
    let conditions: {}[] = [];
    for (const el of data) {
      conditions.push(el);
    }
    try {
      let query = `INSERT INTO ${this.tableName} (name, price, product_id, vendor_id, user_id) VALUES (?, ?, ?, ?, ?)`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    } 
 }
}

export default OrderModel