const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: false
	},
	location: {
		type: String,
		required: false
	},
	bio: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	avatar: {
		type: String
	},
	cloudinary_id: {
		type: String
	}
})

module.exports = mongoose.model("User", userSchema)