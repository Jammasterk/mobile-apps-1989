const express = require('express')
const cloudinary = require('../utils/cloudinary')
const upload = require("../utils/multer")
const Post = require("../models/postSchema")
const postRouter = express.Router()

postRouter.post('/', upload.single("postImage"), async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path)
		let post = new Post({
			author: req.body.author,
			title: req.body.title,
			post: req.body.post,
			postImage: result.secure_url,
			cloudinary_id: result.public_id,
			user: req.user._id
		})

		await post.save()
		res.json(post)
	} catch (error) {
		console.log(error)
	}
})

postRouter.get("/", async (req, res) => {
	try {
		let post = await Post.find()
		res.send(post)
	} catch (error) {
		console.log(error)
	}
})

postRouter.get('/:postId', async (req, res) => {
	try {
		let post = await Post.findById(req.params.postId)
	} catch (error) {
		console.log(error)
	}
})

postRouter.put("/:postId", upload.single("postImage"), async (req, res) => {
	try {
		let post = await Post.findById(req.params.postId)
		await cloudinary.uploader.destroy(post.cloudinary_id)
		let result
		if(req.files){
			result = await cloudinary.uploader.upload(req.file.path)
		}

		const data = {
			title: req.body.title || post.title,
			author: req.body.author || post.author,
			post: req.body.post || post.post,
			postImage: result?.secure_url || post.postImage,
			cloudinary_id: result?.public_id || post.cloudinary_id
		}
		post = await Post.findByIdAndUpdate(req.params.postId, data, {new: true})
		res.json(post)
	} catch (error) {
		console.log(error)
	}
})

postRouter.delete("/:postId", async (req, res) => {
	try {
		let post = await Post.findById(req.params.postId)
		await cloudinary.uploader.destroy(post.cloudinary_id)

		await post.remove()
		res.json(post)
	} catch (error) {
		res.status(500).send(new Error("Something went wrong"))
	}
})

module.exports = postRouter

