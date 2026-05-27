import express from "express"
import upload from "../utils/cloudinaryConfig.js";
import userController from "../controllers/userController.js";

const uploadFields = upload.fields([
    {name: "profile_img", maxCount: 1}
])

const router = express.Router()

router.route("/")
.get(userController.getUsers)
.post(uploadFields, userController.insertUser)

router.route("/:id")
.put(uploadFields, userController.updateUser)
.delete(userController.deleteUser)

export default router