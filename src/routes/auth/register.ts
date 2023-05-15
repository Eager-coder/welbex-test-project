import { Request, Response } from "express"
import User from "../../models/User"
import bcrypt from "bcrypt"
import getUnixTime from "../../helpers/get-unix-time"
import crypto from "crypto"

interface RegisterInfo {
	name?: string
	email?: string
	password?: string
}

export default async function handler(req: Request, res: Response) {
	try {
		const { name, email, password }: RegisterInfo = req.body
		if (!name?.trim() || !email?.trim() || !password?.trim()) {
			return res.status(400).json({ message: "Заполните все поля" })
		}

		if (await User.get(email)) {
			return res.status(400).json({ message: "Пользователь с таким email уже существует" })
		}

		const newUser = {
			id: crypto.randomUUID(),
			name: name.trim(),
			email: email.trim(),
			password: await bcrypt.hash(password, 10),
			date_created: getUnixTime(),
		}
		await User.add(newUser)
		res.json({ message: "Регистрация прошла успешно!" })
	} catch (error) {
		console.log("/auth/register ERROR", error)
		res.status(500).json({ message: "Что-то пошло не так" })
	}
}
