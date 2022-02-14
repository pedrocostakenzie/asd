import { Router } from "express";
import { buyCart, getAllBuys, getOneBuy } from "../controllers/buy.controller";
import { isAuthenticated, isSuperUser, userValidate } from "../middlewares/auth.middleware";

const router = Router();

export const buyRouter = () => {
    router.post("/buy", isAuthenticated, buyCart)
    router.get("/buy/:cartId", isAuthenticated, userValidate, getOneBuy)
    router.get("/buy", isAuthenticated, isSuperUser, getAllBuys)
    return router;
}
