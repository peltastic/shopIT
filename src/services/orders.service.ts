import OrderModel from "../models/orders.model";

class OrderService {
  public orderModel = new OrderModel();
  public async createNewOrderRecords(data: any[]) {
    for (const el of data) {
      await this.orderModel.createOrderRecords([
        el.name,
        el.cart_price,
        el.product_id,
        el.vendor_id,
        el.user_id,
      ]);
    }
  }
}

export default OrderService;
