/*VIDEOJUEGOS
● title
● developer
● genre
● images: {image, image_id}
● price
● rating
● cover
● cover_id
● available
● platforms { }
*/

import {Schema, model} from "mongoose"

const schema = new Schema({
    title: {type: String},
    developer: {type: String},
    genre: {type: String},
    images: [
        {
            image: {type: String},
            image_id: {type: String}
        }
    ],
    price: {type: Number},
    rating: {type: Number},
    cover: {type: String},
    cover_id: {type: String},
    avaliable: {type: Boolean},
    platforms: [
        {
            material: {type: String},
            x: {type: Number},
            y: {type: Number}
        }
    ]
})

export default model("videogameModel", schema)