import CartModel from "../models/cart.model"

class CartService {
    public cartModel = new CartModel()
    public async createCart(data: (string | number)[]) {
        await this.cartModel.createNewCart(data)
    }
    public async increaseCartCount(id: number) {
        await this.cartModel.increaseCartCount(id)
    }
    public async decreaseCartCount(id: number) {
        const res = await this.cartModel.decreaseCartCount(id)
        return res
    }
    public async getUserCarts (id: number) {
        const res = await this.cartModel.getUserCarts(id)
        return res
    }
    public async deleteCart (id: number) {
        await this.cartModel.deleteCart(id)
    }
    public async getSingleCart(id: number) {
        const res = await this.cartModel.getSingleCart(id)
        return res
    }
}

export default CartService