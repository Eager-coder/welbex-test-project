import { Request, Response } from "express"
import RefreshToken from "../../models/RefreshToken"
import getUnixTime from "../../helpers/get-unix-time"
import { generateAccessToken, generateRefreshToken } from "../../helpers/generate-tokens"
import config from "../../config"

export default async function handler(req: Request, res: Response) {
	try {
		const refresh_token = req.cookies.refresh_token
		const tokenObj = await RefreshToken.getByToken(refresh_token)
		if (!tokenObj) {
			return res.status(401).json({ message: "Токен не найден" })
		}
		if (tokenObj.expity_date < getUnixTime()) {
			return res.status(401).json({ message: "Токен просрочен" })
		}
		const newRefreshToken = generateRefreshToken()
		const newAccessToken = generateAccessToken(tokenObj.user_id)
		await RefreshToken.delete(refresh_token)
		await RefreshToken.add({
			token: newRefreshToken,
			user_id: tokenObj.user_id,
			expity_date: getUnixTime() + 86400 * 14,
		})
		res.cookie("refresh_token", newRefreshToken, {
			maxAge: 14 * 86400,
			secure: config.NODE_ENV === "production",
		})
		res.cookie("access_token", newAccessToken, {
			maxAge: 15 * 60,
			secure: config.NODE_ENV === "production",
		})
		res.json({ message: "Токены обновлены" })
	} catch (error) {
		console.log("/auth/refresh-token ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
