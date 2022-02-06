import { Express } from "express"
import { userRouter } from "./user.router";

export const initializerRouter = (app: Express) => {
  app.use('', userRouter());
  
}
