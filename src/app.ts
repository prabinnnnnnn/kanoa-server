import express from "express"
import router from "./routes/_route.js";
import { registerMiddlewares } from "./middlewares/index.middleware.js";

const app = express();

registerMiddlewares(app);
app.use('/', router);

export default app;