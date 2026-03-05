import { Router } from "express";
import  authMiddleware, { authSystemUserMiddleware } from "../middlewares/auth.middlewares.js";
import { createTranscation, createSystemUserInitialFundsController} from "../controllers/transcation.controllers.js";

const router = Router();

router.post("/create", authMiddleware, createTranscation)

router.post("/system/initial-funds",authSystemUserMiddleware, createSystemUserInitialFundsController)

export default router;