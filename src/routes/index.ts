import { Router } from "express"
import authRouter from "./auth"
import postRouter from "./posts"

const router = Router()

router.use("/auth", authRouter)
router.use("/posts", postRouter)

export default router
