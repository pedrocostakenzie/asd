import { Router } from "express";
import { getAllUsers, getOneUser, postUser, signIn } from "../controllers/user.controller";

const router = Router();

export const userRouter = () => {
    router.post("/user", postUser)
    router.post("/login", signIn)
    router.get("/user/:id", getOneUser)
    router.get("/user", getAllUsers)
    return router;
}
