/*
CARRITO DE COMPRAS
● user_id
● videogames : [{
    videogame_id,
    quantity,
    subtotal
}]
● total
● status
*/

import {Schema, model} from "mongoose"

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },
    videogames: [
        {
            videogame_id: {
                type: Schema.Types.ObjectId,
                ref: "videogameModel"
            },
            quantity: {type: Number},
            subtotal: {type: Number}
        }
    ],
    total: {type: Number},
    status: {type: String}
})

export default model("shoppingCartModel", schema)
