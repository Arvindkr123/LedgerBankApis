import { Router } from 'express'
import { userRegisterController, userLoginController, userLogoutController } from '../controllers/auth.controllers.js';
const router = Router()

router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.post("/logout", userLogoutController)

export default router;