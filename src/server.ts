import App from "./app";
import AuthRoute from "./routes/auth.routes";
import UserRoute from "./routes/user.routes";
import VendorRoute from "./routes/vendor.routes";
import ProductRoute from "./routes/product.routes";
import CartRoute from "./routes/cart.routes"
import OrderRoute from "./routes/order.routes";
import PayStackWebhookRoute from "./routes/paystackwebhook.routes";

const app = new App([
  new UserRoute(),
  new VendorRoute(),
  new AuthRoute(),
  new ProductRoute(),
  new CartRoute(),
  new OrderRoute(),
  new PayStackWebhookRoute()
]);

app.listen();
