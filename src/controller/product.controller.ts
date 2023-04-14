import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import { CreateProductInput } from "../schema/product.schema";

class ProductController {
  public productsService = new ProductService();

  public async createProduct(req: Request<{}, {}, CreateProductInput>, res: Response, next: NextFunction) {
    const { name, description, price, flags, image_urls, vendor_id } = req.body;
    try {
      await this.productsService.createProduct([
        name,
        description,
        price,
        JSON.stringify(flags),
        JSON.stringify(image_urls),
        vendor_id,
      ]);
      return res.status(201).json({
        status: true,
        Message: "vendor created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
