import dotenv from "dotenv"
import findConfig from "find-config"

dotenv.config({ path: findConfig(".env")! })

export default {
	PG_STRING: process.env.PG_STRING,
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	BASE_URL: process.env.BASE_URL,
	CA_CERT: process.env.CA_CERT,
}
