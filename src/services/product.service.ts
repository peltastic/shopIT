import { IGetAllProductsQuery, IGetVendorProductsQuery } from "../interfaces/products.interfaces";
import ProductModel from "../models/products.model";

class ProductService {
    public products = new ProductModel()
    public async createProduct(data: (string | string[] | number)[]) {
        await this.products.createNewProduct(data)
    }
    public async getAllProducts(queries: IGetAllProductsQuery) {
        const res = this.products.getProducts(queries)
        return res
    }
    public async getVendorsProduct (queries: IGetVendorProductsQuery) {
        const res = this.products.getVendorProducts(queries)
        return res
    }
}

export default ProductService