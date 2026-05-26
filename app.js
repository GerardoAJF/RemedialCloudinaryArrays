import express from "express"
import videogameRouter from "./src/routes/videogameRoute.js"

const app = express()
app.disable("x-powered-by")

app.use(express.json())

app.use(videogameRouter)

export default app
