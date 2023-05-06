import { execute } from "../utils/db";

class CartModel {
  public tableName: string = "carts";
  public async createNewCart(data: (string | number)[]) {
    let conditions: {}[] = [];
    for (const el of data) {
      conditions.push(el);
    }
    try {
      let query = `INSERT INTO ${this.tableName} (name, price, cart_price, product_id, vendor_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async increaseCartCount(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `UPDATE ${this.tableName} SET product_count = product_count + 1, cart_price = cart_price + price WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  
  public async decreaseCartCount(id: number) {
    try {
      let conditions: {}[] = [];
      conditions.push(id);
      let query = `UPDATE ${this.tableName} SET product_count = product_count - 1, cart_price = cart_price - price WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async getUserCarts(id: number) {
    let conditions: {}[] = [];
    conditions.push(id);
    try {
      let query = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async getSingleCart(id: number) {
    let conditions: {}[] = [];
    conditions.push(id);
    try {
      let query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async deleteCart(id: number) {
    let conditions: {}[] = [];
    conditions.push(id);
    try {
      let query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default CartModel;
