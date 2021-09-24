const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: false
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
	},
	postImageThree: {
		type: String
	},
	postImageFour: {
		type: String
	},
	cloudinary_id: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
})

module.exports = mongoose.model("Post", postSchema)