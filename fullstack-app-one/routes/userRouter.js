const express = require('express')
const cloudinary = require('../utils/cloudinary')
const upload = require("../utils/multer")
const User = require("../models/userSchema")
const userRouter = express.Router()

userRouter.post("/", upload.single("image"), async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path)
		let user = new User({
			name: req.body.name,
			age: req.body.age,
			location: req.body.location,
			bio: req.body.bio,
			avatar: result.secure_url,
			cloudinary_id: result.public_id
		})
		await user.save()
		res.json(user)
	} catch (error) {
		console.log(error)
	}
})

userRouter.get("/", async (req, res) => {
	try {
		let user = await User.find()
		res.json(user)
	} catch (error) {
		console.log(error)
	}
})

userRouter.get("/:userId", async (req, res) => {
	try {
		let user = await User.findById(req.params.userId)
		res.json(user)
	} catch (error) {
		console.log(error)
	}
})

userRouter.put("/:userId", upload.single("image"), async (req, res) => {
	try {
		let user = await User.findById(req.params.userId)
		await cloudinary.uploader.destroy(user.cloudinary_id)
		let result

		if(req.file){
			result = await cloudinary.uploader.upload(req.file.path)
		}

		const data = {
			name: req.body.name || user.name,
			age: req.body.age || user.age,
			location: req.body.location || user.location,
			bio: req.body.bio || user.bio,
			avatar: result?.secure_url || user.avatar,
			cloudinary_id: result?.public_id || user.cloudinary_id
		}
		user = await User.findByIdAndUpdate(req.params.userId, data, {new: true})
		res.json(user)
	} catch (error) {
		console.log(error)
	}
})

userRouter.delete("/:userId", async (req, res, next) => {
	try {
		let user = await User.findById(req.params.userId)
		await cloudinary.uploader.destroy(user.cloudinary_id)

		await user.remove()
		res.json(user)
	} catch (error) {
		res.status(500).send(new Error("user profile removed"))
	}
})

module.exports = userRouter