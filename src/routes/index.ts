import { Express } from "express"
import { buyRouter } from "./buy.router";
import { cartRouter } from "./cart.router";
import { emailRouter } from "./email.router";
import { productRouter } from "./product.router";
import { userRouter } from "./user.router";

export const initializerRouter = (app: Express) => {
  app.use('', userRouter());
  app.use('', productRouter())
  app.use('', cartRouter())
  app.use('', buyRouter())
  app.use('', emailRouter())
}
