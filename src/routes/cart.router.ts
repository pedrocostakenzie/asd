import { Router } from "express";
import { deleteProduct, getAllCarts, getOneCart, postCartProduct } from "../controllers/cart.controller";
import { isAuthenticated, isSuperUser, userValidate } from "../middlewares/auth.middleware";

const router = Router();

export const cartRouter = () => {
    router.post("/cart", isAuthenticated, postCartProduct)
    router.get("/cart/:id", isAuthenticated, userValidate, getOneCart)
    router.get("/cart",isAuthenticated, isSuperUser, getAllCarts)
    router.delete("/cart/:productId", isAuthenticated, deleteProduct)
    return router;
}
