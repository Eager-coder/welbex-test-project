import { Pool, PoolConfig } from "pg"
import config from "./config"

const clientOptions: PoolConfig = {
	ssl: { rejectUnauthorized: false },
	connectionString: config.PG_STRING,
}

const client = new Pool(clientOptions)
client.connect()
export default client
