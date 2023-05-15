import { Request, Response } from "express"
import User from "../../models/User"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../helpers/generate-tokens"
import config from "../../config"
import RefreshToken from "../../models/RefreshToken"
import getUnixTime from "../../helpers/get-unix-time"

export default async function handler(req: Request, res: Response) {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ message: "Заполните все поля" })
		}
		const user = await User.get(email)
		if (!user) {
			return res.status(400).json({ message: "Неправильный email или пароль" })
		}
		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ message: "Неправильный email или пароль" })
		}
		const accessToken = generateAccessToken(user.id)
		const refreshToken = generateRefreshToken()
		await RefreshToken.add({ token: refreshToken, user_id: user.id, expity_date: getUnixTime() + 86400 * 14 })
		res.cookie("access_token", accessToken, { maxAge: 15 * 60 * 1000, secure: config.NODE_ENV === "production" })
		res.cookie("refresh_token", refreshToken, {
			maxAge: 14 * 86400 * 1000,
			secure: config.NODE_ENV === "production",
		})
		res.json({
			id: user.id,
			name: user.name,
			email: user.email,
			date_created: user.date_created,
		})
	} catch (error) {
		console.log("/auth/login ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
