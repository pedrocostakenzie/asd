import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";
import { isAuthenticated, isSuperUser } from "../middlewares/auth.middleware";

const router = Router();

export const emailRouter = () => {
    router.post("/email", isAuthenticated, isSuperUser, sendEmail)
    return router;
}
