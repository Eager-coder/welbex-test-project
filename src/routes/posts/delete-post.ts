import { Request, Response } from "express"
import Post from "../../models/Post"

export default async function handler(req: Request, res: Response) {
	try {
		const { id } = req.body
		if (!id) {
			return res.status(404).json({ message: "Пост не найден" })
		}
		const { user_id } = res.locals.user
		const post = await Post.getOne(id)

		if (!post || post.user_id != user_id) {
			return res.status(404).json({ message: "Пост не найден" })
		}
		await Post.delete(id)
		return res.json({ message: "Пост удален" })
	} catch (error) {
		console.log("/posts/ DELETE ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
