const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema:Object = new Schema({
	postBody: {
		type: String,
		required: true,
	},
	emphasized: {
		type: Boolean,
		default: false
	},
	postImage: {
		type: String,
		required: false
	},
	tags: {
		type: String,
		required: false
	}
})

module.exports = mongoose.model("Post", postSchema)