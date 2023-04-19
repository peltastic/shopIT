import { IGetAllProductsQuery, IGetVendorProductsQuery } from "../interfaces/products.interfaces";
import ProductModel from "../models/products.model";

class ProductService {
    public products = new ProductModel()
    public async createProduct(data: (string | string[] | number)[]) {
        await this.products.createNewProduct(data)
    }
    public async getAllProducts(queries: IGetAllProductsQuery) {
        const res = await this.products.getProducts(queries)
        return res
    }
    public async getAllVendorsProducts (queries: IGetVendorProductsQuery) {
        const res = await this.products.getVendorProducts(queries)
        return res
    }
    public async getProduct (id: number) {
        const res = await this.products.getSingleProduct(id)
        return res
    }
    public async deleteProduct (id: number) {
        await this.products.deleteProduct(id)
    }
}

export default ProductService