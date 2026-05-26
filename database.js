import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/EpicGames")

const connection = mongoose.connection

connection.once("open", () => console.log("Connection open"))
connection.once("disconnected", () => console.log("Connection disconnected"))
connection.once("error", () => console.log("Connection error"))

