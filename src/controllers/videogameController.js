import videogameModel from "../models/videogameModel.js";
import {v2 as cloudinary} from "cloudinary"

const videogameController = {}

videogameController.getVideogames = async (req, res) => {
    try {
        const videogames = await videogameModel.find();
        res.status(200).json({message: "Videogames selected", data: videogames})

    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

videogameController.insertVideogame = async (req, res) => {
    try {
        let { title, developer, genre, price, rating, available, platforms} = req.body;
        platforms = JSON.parse(platforms)

        if (price < 0) return res.status(400).json({message: "Price can't be negative"})
        if (rating < 0 || rating > 5) return res.status(400).json({message: "Rating must be between 0 and 5"})

        let processedImages = []
        for (const image of req.files["images"]) {
            processedImages.push(
                {
                    image: image.path,
                    image_id: image.filename
                }
            )
        }

        const newVideogame = new videogameModel({
            title,
            developer,
            genre,
            price,
            rating,
            available,
            platforms,
            images: processedImages,
            cover: req.files["cover"][0].path,
            cover_id: req.files["cover"][0].filename
        })

        await newVideogame.save()
        res.status(200).json({message: "Videogame inserted", data: newVideogame})


    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

videogameController.updateVideogame = async (req, res) => {
    try {
        const oldVideogame = await videogameModel.findById(req.params.id)

        let { title, developer, genre, price, rating, available, platforms } = req.body;
        platforms = JSON.parse(platforms)

        if (price < 0) return res.status(400).json({ message: "Price can't be negative" })
        if (rating < 0 || rating > 5) return res.status(400).json({ message: "Rating must be between 0 and 5" })

        const updatedData = {}

        if (req.files["images"]) {
            for (const oldImage in oldVideogame.images) {
                await cloudinary.uploader.destroy(oldImage.image_id)
            }

            let processedImages = []
            for (const image of req.files["images"]) {
                processedImages.push(
                    {
                        image: image.path,
                        image_id: image.filename
                    }
                )
            }
            updatedData.processedImages = processedImages
        }

        if (req.files["cover"][0]) {
            await cloudinary.uploader.destroy(oldVideogame.cover_id)

            updatedData.cover = req.files["cover"][0].path
            updatedData.cover_id = req.files["cover"][0].filename
        }

        const updatedVideogame = await videogameModel.findByIdAndUpdate(req.params.id, {
            title,
            developer,
            genre,
            price,
            rating,
            available,
            platforms,
            ...updatedData
        }, {returnDocument: "after"})

        res.status(200).json({message: "Videogame updated", data: updatedVideogame})

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
