import ProductModel from "../models/products.model";

class ProductService {
    public products = new ProductModel()
    public async createProduct(data: (string | string[])[]) {
        await this.products.createNewProduct(data)
    }
}

export default ProductService