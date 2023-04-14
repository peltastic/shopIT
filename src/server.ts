import App from "./app";
import AuthRoute from "./routes/auth.routes";
import UserRoute from "./routes/user.routes";
import VendorRoute from "./routes/vendor.routes";
import ProductRoute from "./routes/product.routes";

const app = new App([
  new UserRoute(),
  new VendorRoute(),
  new AuthRoute(),
  new ProductRoute(),
]);

app.listen();
