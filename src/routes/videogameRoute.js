import express from "express"
import videogameController from "../controllers/videogameController.js"

const router = express.Router()

router.route("/")
.get(videogameController.getVideogames)
.post(videogameController.insertVideogame)

router.route("/:id")
.put(videogameController.updateVideogame)
.delete(videogameController.deleteVideogame)

export default router
