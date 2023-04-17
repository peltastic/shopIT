import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import { CreateProductInput } from "../schema/product.schema";
import { IGetAllProductsQuery } from "../interfaces/products.interfaces";

class ProductController {
  public productService = new ProductService();

  public createProduct = async (
    req: Request<{}, {}, CreateProductInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, price, category, image_urls, vendor_id } =
      req.body;
    try {
      await this.productService.createProduct([
        name,
        description,
        price,
        category,
        JSON.stringify(image_urls),
        Number(vendor_id),
      ]);
      return res.status(201).json({
        status: true,
        Message: "product created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { limit, page, category, price } = req.query;
    const query: IGetAllProductsQuery = {
      offset: 0,
      limit: 0,
    };
    const perpage = Number(limit) || 10;
    const offset = Number(page) - 1 || 0;
    const skip = perpage * offset;
    query.offset = skip;
    query.limit = perpage;
    if (category) {
      query.category = category as string;
    }
    if (price) {
      query.price = Number(price);
    }
    try {
      const products = await this.productService.getAllProducts(query);
      return res.status(200).json({
        status: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {productId} = req.params
    
  }
}

export default ProductController;
