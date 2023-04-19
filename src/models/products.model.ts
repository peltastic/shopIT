import {
  IGetAllProductsQuery,
  IGetVendorProductsQuery,
} from "../interfaces/products.interfaces";
import { execute } from "../utils/db";

class ProductModel {
  public tableName: string = "products";
  public async createNewProduct(data: (string | string[] | number)[]) {
    try {
      let conditions: {}[] = [];
      for (const el of data) {
        conditions.push(el);
      }
      let query = `INSERT INTO ${this.tableName} (names, descriptions, price, category, image_url, vendor_id) VALUES (?, ?, ?, ?, ?, ?)`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async getProducts(queries: IGetAllProductsQuery) {
    try {
      let conditions: any[] = [];
      if (queries.price) {
        conditions.push(queries.price);
      }
      if (queries.category) {
        conditions.push(queries.category);
      }
      conditions.push(queries.limit);
      conditions.push(queries.offset);
      let query =
        queries.price && queries.category
          ? `SELECT * FROM ${this.tableName} WHERE price > ? AND category = ? limit ? offset ?`
          : queries.price
          ? `SELECT * FROM ${this.tableName} WHERE price > ? limit ? offset ?`
          : queries.category
          ? `SELECT * FROM ${this.tableName} WHERE category = ? limit ? offset ?`
          : `SELECT * FROM ${this.tableName} limit ? offset ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async getSingleProduct(id: number) {
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
  public async getVendorProducts(queries: IGetVendorProductsQuery) {
    try {
      let conditions: any[] = [];
      conditions.push(queries.id);
      if (queries.price) {
        conditions.push(queries.price);
      }
      if (queries.category) {
        conditions.push(queries.category);
      }
      conditions.push(queries.limit);
      conditions.push(queries.offset);
      let query =
        queries.price && queries.category
          ? `SELECT * FROM ${this.tableName} WHERE vendor_id = ? AND price > ? AND category = ? limit ? offset ?`
          : queries.price
          ? `SELECT * FROM ${this.tableName} WHERE vendor_id = ? AND price > ? limit ? offset ?`
          : queries.category
          ? `SELECT * FROM ${this.tableName} WHERE vendor_id = ? AND category = ? limit ? offset ?`
          : `SELECT * FROM ${this.tableName} WHERE vendor_id = ? limit ? offset ?`;
      return execute(query, conditions);
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
  public async deleteProduct(id: number) {
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
}

export default ProductModel;
