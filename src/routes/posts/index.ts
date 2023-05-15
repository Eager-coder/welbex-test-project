import { Router } from "express"
import verifyAuth from "../../middlewares/verifyAuth"
import createPostHandler from "./create-post"
import getOnePostHandler from "./get-post"
import getManyPostsHandler from "./get-posts"
import updatePostHandler from "./update-post"
import deletePostHandler from "./delete-post"
import multer from "multer"

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/blog_images/")
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}--${file.originalname}`)
	},
})

var upload = multer({ storage: storage })
const router = Router()

router.post("/", verifyAuth, upload.single("image"), createPostHandler)
router.get("/:id/", verifyAuth, getOnePostHandler)
router.get("/", verifyAuth, getManyPostsHandler)
router.put("/", verifyAuth, upload.single("image"), updatePostHandler)
router.delete("/", verifyAuth, deletePostHandler)

export default router
