import App from "./app";
import UserRoute from "./routes/user.routes";
import VendorRoute from "./routes/vendor.routes";

const app = new App([new UserRoute(), new VendorRoute()]);

app.listen();
