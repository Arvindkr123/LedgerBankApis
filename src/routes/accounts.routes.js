import { Router } from "express";
import authMiddleware from "../middlewares/auth.middlewares.js";
import { createAccountController, getAccountBalanceController} from "../controllers/account.controllers.js";

const router = Router();

router.post("/", authMiddleware, createAccountController)
router.get("/balance/:accountId", authMiddleware, getAccountBalanceController)

export default router;