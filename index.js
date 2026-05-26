import app from "./app.js";
import "./database.js"

const main = () => {
    app.listen(4000)
    console.log("Server started at port 4000")
}

main()
