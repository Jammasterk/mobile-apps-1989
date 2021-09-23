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

module.exports = postRouter

