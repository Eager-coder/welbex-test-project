import express from "express"
import router from "./routes"
import config from "./config"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)

app.listen(config.PORT, () => {
	console.log("Server has started on port", config.PORT)
})
