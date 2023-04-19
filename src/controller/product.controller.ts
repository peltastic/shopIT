import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import { CreateProductInput } from "../schema/product.schema";
import {
  IGetAllProductsQuery,
  IGetVendorProductsQuery,
} from "../interfaces/products.interfaces";

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
    const queries: IGetAllProductsQuery = {
      offset: 0,
      limit: 0,
    };
    const perpage = Number(limit) || 10;
    const offset = Number(page) - 1 || 0;
    const skip = perpage * offset;
    queries.offset = skip;
    queries.limit = perpage;
    if (category) {
      queries.category = category as string;
    }
    if (price) {
      queries.price = Number(price);
    }
    try {
      const products = await this.productService.getAllProducts(queries);
      return res.status(200).json({
        status: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  public getVendorProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { vendorId } = req.params;
    const { limit, page, category, price } = req.query
    const queries: IGetVendorProductsQuery = {
      id: Number(vendorId),
      offset: 0,
      limit: 0,
    };
    const perpage = Number(limit) || 10;
    const offset = Number(page) - 1 || 0;
    const skip = perpage * offset;
    queries.offset = skip;
    queries.limit = perpage;
    if (category) {
      queries.category = category as string;
    }
    if (price) {
      queries.price = Number(price);
    }
    try {
      const products = await this.productService.getAllVendorsProducts(queries)
      return res.status(200).json({
        status: true,
        data: products
      })
    } catch (error) {
      next(error)
    }
  };
  public getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {productId} = req.params
    try {
      const product = await this.productService.getProduct(Number(productId))
      return res.status(200).json({
        status: true,
        data: product
      })

    }catch(error) {
      next(error)
    }
  }
  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const {productId} = req.params
    try {
        await this.productService.deleteProduct(Number(productId))
        return res.status(200).json({
          status: true,
          message: "Product deleted successfully"
        })
    }catch (error) {
      next(error)
    }
  }
}

export default ProductController;
