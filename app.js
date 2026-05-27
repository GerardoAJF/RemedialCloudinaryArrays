import express from "express"
import videogameRouter from "./src/routes/videogameRoute.js"

const app = express()
app.disable("x-powered-by")

app.use(express.json())

app.use("/api/videogames", videogameRouter)

export default app
