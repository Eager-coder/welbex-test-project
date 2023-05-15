import { Request, Response } from "express"
import Post from "../../models/Post"

export default async function handler(req: Request, res: Response) {
	try {
		let page = Number(req.query.page)
		if (!page) {
			page = 1
		}
		return res.json(await Post.getMany((page - 1) * 20, 20))
	} catch (error) {
		console.log("/posts?page=$ GET ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
