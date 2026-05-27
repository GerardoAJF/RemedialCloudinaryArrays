import express from "express"
import videogameRouter from "./src/routes/videogameRoute.js"
import userRouter from "./src/routes/userRoute.js"
import shoppingCartRouter from "./src/routes/shoppingCartRoute.js"

const app = express()
app.disable("x-powered-by")

app.use(express.json())

app.use("/api/videogames", videogameRouter)
app.use("/api/users", userRouter)
app.use("/api/shoppingCart", shoppingCartRouter)

export default app
