import express from "express"
import shoppingCartController from "../controllers/shoppingCartController.js";

const router = express.Router()

router.route("/")
.get(shoppingCartController.getShoppingCarts)
.post(shoppingCartController.insertShoppingCart)

router.route("/:id")
.put(shoppingCartController.updateShoppingCart)
.delete(shoppingCartController.deleteShoppingCart)

export default router