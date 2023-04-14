import { execute } from "../utils/db";

class ProductModel {
    public tableName: string = "products"
  public async createNewProduct(data: (string | string[])[]) {
    try {
        let conditions: {}[] = []
        for (const el of data) {
            conditions.push(el);
          }
        let query = `INSERT INTO ${this.tableName} (names, descriptions, price, flags, image_url, vendor_id) VALUES (?, ?, ?, ?, ?, ?)`;
        return execute(query, conditions)
    } catch (error) {
      console.error("MySql Query Error", error);
      return null;
    }
  }
}

export default ProductModel