import express from "express"
import upload from "../utils/cloudinaryConfig.js"
import videogameController from "../controllers/videogameController.js"

const uploadFields = upload.fields([
    { name: "images", maxCount: 10 },
    { name: "cover", maxCount: 1 },
]);

const router = express.Router()

router.route("/")
    .get(videogameController.getVideogames)
    .post(uploadFields, videogameController.insertVideogame)

router.route("/:id")
    .put(uploadFields, videogameController.updateVideogame)
    .delete(videogameController.deleteVideogame)

export default router
