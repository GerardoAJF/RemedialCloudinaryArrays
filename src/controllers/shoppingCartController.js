import shoppingCartModel from "../models/shoppingCartModel.js";
import videogameModel from "../models/videogameModel.js"

const shoppingCartController = {}

shoppingCartController.getShoppingCarts = async (req, res) => {
    try {
        const shoppingCarts = await shoppingCartModel.find()
            .populate("user_id", "username email")
            .populate("videogames.videogame_id", "title developer genre price rating available")

        res.status(200).json({ message: "Shopping carts selected", data: shoppingCarts })
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({ message: "Internal server error" })
    }
}

shoppingCartController.insertShoppingCart = async (req, res) => {
    try {
        const { user_id, videogames } = req.body;

        let total = 0
        const processedVideogames = []
        for (const videogame of videogames) {
            const databaseVideogame = await videogameModel.findById(videogame.videogame_id)
            if (!databaseVideogame) return res.status(400).json({ message: "Videogame not found" })

            const processedVideogame = {}
            processedVideogame.videogame_id = videogame.videogame_id
            processedVideogame.quantity = videogame.quantity
            const subtotal = videogame.quantity * databaseVideogame.price
            processedVideogame.subtotal = subtotal

            processedVideogames.push(processedVideogame)
            total += subtotal
        }

        const newShoppingCart = new shoppingCartModel({
            user_id,
            videogames: processedVideogames,
            total,
            status: "pending"
        })
        await newShoppingCart.save()
        res.status(200).json({ message: "Shopping cart inserted", data: newShoppingCart })
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({ message: "Internal server error" })
    }
}

shoppingCartController.updateShoppingCart = async (req, res) => {
    try {
        const { user_id, videogames, status } = req.body;

        let total = 0
        const newVideogames = []
        for (const videogame of videogames) {
            const databaseVideogame = await videogameModel.findById(videogame.videogame_id)
            if (!databaseVideogame) return res.status(400).json({ message: "Videogame not found" })

            const newVideogame = {}
            newVideogame.videogame_id = videogame.videogame_id
            newVideogame.quantity = videogame.quantity
            const subtotal = databaseVideogame.price * videogame.quantity
            newVideogame.subtotal = subtotal

            newVideogames.push(newVideogame)
            total += subtotal
        }

        const updatedShoppingCart = await shoppingCartModel.findByIdAndUpdate(
            req.params.id,
            { user_id, videogames: newVideogames, total, status },
            { returnDocument: "after" }
        )
        if (!updatedShoppingCart) return res.status(400).json({message: "Shopping cart not found"})

        res.status(200).json({message: "Shopping cart updated", data: updatedShoppingCart})
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({ message: "Internal server error" })
    }
}

shoppingCartController.deleteShoppingCart = async (req, res) => {
    try {
        const deletedShoppingCart = await shoppingCartModel.findByIdAndDelete(req.params.id)
        if (!deletedShoppingCart) return res.status(400).json({message: "Shopping cart not found"})

        res.status(200).json({message: "Shopping cart deleted", data: deletedShoppingCart})
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default shoppingCartController