import { Request, Response } from "express"
import RefreshToken from "../../models/RefreshToken"

export default async function handler(req: Request, res: Response) {
	const refresh_token = req.cookies.refresh_token
	await RefreshToken.delete(refresh_token)
	res.clearCookie("access_token")
	res.clearCookie("refresh_token")
	res.json({ message: "Вы вышли из акккутна" })
}
