import { Request, Response } from "express"
import Post from "../../models/Post"
import crypto from "crypto"
import config from "../../config"

export default async function handler(req: Request, res: Response) {
	try {
		const { header, text } = req.body

		if (!header?.trim()) {
			return res.status(400).json({ message: "Заголовок является обязательным" })
		}
		if (!text?.trim() && !req.file) {
			return res.status(400).json({ message: "Сообщение должно содержать текст и/или медиа" })
		}

		const newPost = {
			id: crypto.randomUUID(),
			header,
			text,
			image_url: req.file ? config.BASE_URL + "/blog_images/" + req.file?.filename : null,
			user_id: res.locals.user.user_id,
			date: new Date().toISOString().split("T")[0],
		}

		await Post.add(newPost)
		res.json(newPost)
	} catch (error) {
		console.log("/posts/ POST ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
