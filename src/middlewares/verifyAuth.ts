import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "../config"

export default async function verifyAuth(req: Request, res: Response, next: NextFunction) {
	try {
		const { access_token } = req.cookies
		if (!access_token) {
			return res.status(401).json({ message: "Войдите чтобы продолжить" })
		}
		const decoded = jwt.verify(access_token, config.JWT_ACCESS_SECRET!)
		res.locals.user = decoded
		next()
	} catch (error) {
		console.log("ACCESS TOKEN INVALID", error)
		res.status(401).json({ message: "Войдите чтобы продолжить" })
	}
}
