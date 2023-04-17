export interface IGetAllProductsQuery {
  offset: number;
  limit: number;
  category?: string;
  price?: number;
}

export interface IGetVendorProductsQuery {
    offset: number;
    limit: number;
    id: number
    category?: string;
    price?: number;
}
