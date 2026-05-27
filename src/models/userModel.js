/*
USUARIOS
● username
● email
● password
*/

import { Schema, model } from "mongoose";

const schema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String }
});

export default model("userModel", schema);