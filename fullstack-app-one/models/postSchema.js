const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	post: {
		type: String,
		required: true
	},
	postImage: {
		type: String
	},
	postImageTwo: {
		type: String
	}
})

module.exports = mongoose.model("Post", postSchema)