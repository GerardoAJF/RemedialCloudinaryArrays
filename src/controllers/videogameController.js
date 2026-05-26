import videogameModel from "../models/videogameModel.js";
import {v2 as cloudinary} from "cloudinary"

const videogameController = {}

videogameController.getVideogames = async (req, res) => {
    try {
        const videogames = videogameModel.find();
        res.status(200).json({message: "Videogames selected", data: videogames})

    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

videogameController.insertVideogame = async (req, res) => {
    try {
        const {title, developer, genre, images, price, rating, cover, avaliable, platforms} = req.body;

        if (price < 0) return res.status(400).json({message: "Price can't be negative"})
        if (rating < 0 || rating > 5) return res.status(400).json({message: "Rating must be between 0 and 5"})

        let processedImages = []
        for (const image of images) {
            processedImages.push(
                {
                    image: image.file.path,
                    image_id: image.file.filename
                }
            )
        }


    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

videogameController.updateVideogame = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

videogameController.deleteVideogame = async (req, res) => {
    try {
        const oldVideogame = await videogameModel.findById(req.params.id)

        if (!oldVideogame) return res.status(400).json({message: "Videogame not found"})

        for (const image of oldVideogame.images) {
            await cloudinary.uploader.destroy(image.image_id)
        }

        await cloudinary.uploader.destroy(oldVideogame.cover_id)
        await videogameModel.findByIdAndDelete(req.params.id)

        res.status(200).json({message: "Videogame deleted", data: oldVideogame})

    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default videogameController
