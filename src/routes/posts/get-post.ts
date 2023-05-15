import { Request, Response } from "express"
import Post from "../../models/Post"

export default async function handler(req: Request, res: Response) {
	try {
		let { id } = req.params
		if (!id) {
			return res.status(404).json({ message: "Пост не найден" })
		}
		const post = await Post.getOne(id)
		if (!post) {
			return res.status(404).json({ message: "Пост не найден" })
		}
		res.json(post)
	} catch (error) {
		console.log("/posts?page=$ GET ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
