import { Request, Response } from "express"
import config from "../../config"
import Post from "../../models/Post"

export default async function handler(req: Request, res: Response) {
	try {
		const { id, header, text } = req.body
		const { user_id } = res.locals.user
		const post = await Post.getOne(id)
		if (!id || !post || post.user_id != user_id) {
			return res.status(404).json({ message: "Пост с таким id не найден" })
		}
		const editedPost = {
			...post,
			header: header || post.header,
			text: text || post.text,
			image_url: req.file ? config.BASE_URL + "/blog_images/" + req.file?.filename : post.image_url,
		}

		await Post.update(editedPost)
		res.json(editedPost)
	} catch (error) {
		console.log("/posts/ POST ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
