import { Router } from "express"
import registerHandler from "./register"
import loginHandler from "./login"
import logoutHandler from "./logout"
import refreshTokenHandler from "./refresh-token"
import verifyAuth from "../../middlewares/verifyAuth"

const router = Router()

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/refresh-token", refreshTokenHandler)
router.delete("/logout", verifyAuth, logoutHandler)

export default router
