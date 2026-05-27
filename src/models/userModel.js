/*
USUARIOS
● username
● email
● password
● profile_img
● profile_img_id
*/

import { Schema, model } from "mongoose";

const schema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    profile_img: { type: String },
    profile_img_id: { type: String }
});

export default model("userModel", schema);