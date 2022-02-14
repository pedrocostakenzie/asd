import { Router } from "express";
import { generateToken, getAllUsers, getOneUser, passwordRecovery, postUser, signIn } from "../controllers/user.controller";
import { isAuthenticated, isSuperUser, userValidate } from "../middlewares/auth.middleware";
import { verifyRecoveryToken } from "../middlewares/recovery.middleware";

const router = Router();

export const userRouter = () => {
    router.post("/user", postUser)
    router.post("/login", signIn)
    router.get("/user/:id", isAuthenticated, userValidate, getOneUser)
    router.get("/user", isAuthenticated, isSuperUser, getAllUsers)
    router.post("/recuperar", generateToken)
    router.post("/alterar_senha", verifyRecoveryToken, passwordRecovery)
    return router;
}
