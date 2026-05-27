import {v2 as cloudinary} from "cloudinary"

import userModel from "../models/userModel.js";
const userController = {}

userController.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({message: "Users selected", data: users})
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

userController.insertUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) return res.status(400).json({message: "All fields are required"});
        if (await userModel.findOne({email})) return res.status(400).json({message: "Email already in use"});

        const newUser = new userModel({
            username,
            email,
            password,
            profile_img: req.files["profile_img"][0].path,
            profile_img_id: req.files["profile_img"][0].filename
        });
        await newUser.save();
        res.status(200).json({message: "User created", data: newUser});
    } catch (error) {
        console.log("error: " + error);
        res.status(500).json({message: "Internal server error"});
    }
};

userController.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) return res.status(400).json({message: "All fields are required"});

        const imagePayload = {}
        if (req.files["profile_img"]) {
            const oldUser = await userModel.findById(req.params.id)
            if (oldUser.profile_img_id) await cloudinary.uploader.destroy(oldUser.profile_img_id)

            imagePayload.profile_img = req.files["profile_img"][0].path
            imagePayload.profile_img_id = req.files["profile_img"][0].filename
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { username, email, password, ...imagePayload }, { returnDocument: "after" });
        if (!updatedUser) return res.status(400).json({message: "User not found"})

        res.status(200).json({message: "User updated", data: updatedUser})
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

userController.deleteUser = async (req, res) => {
    try {
        const oldUser = await userModel.findById(req.params.id)
        await cloudinary.uploader.destroy(oldUser.profile_img_id)

        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        if (!deletedUser) return res.status(400).json({message: "User not found"})
        
        res.status(200).json({message: "User deleted", data: deletedUser})
    } catch (error) {
        console.log("error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

export default userController