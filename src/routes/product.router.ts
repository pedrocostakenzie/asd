import { Router } from "express";
import { getAllProducts, getOneProduct, postProduct } from "../controllers/product.controller";
import { isAuthenticated, isSuperUser } from "../middlewares/auth.middleware";

const router = Router();

export const productRouter = () => {
    router.post("/product", isAuthenticated, isSuperUser, postProduct)
    router.get("/product/:id", getOneProduct)
    router.get("/product", getAllProducts)
    return router;
}
