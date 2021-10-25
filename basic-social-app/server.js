const mongoose = require('mongoose')
const  express = require('express')
const app = express()
const dot = require("dotenv").config()
app.use(express.json())
const config = require("./config")

console.log(config)

mongoose.connect('mongodb://localhost:27017/social-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
},
() => console.log("connected to db")
)

app.listen(6767, () => {
	console.log('Server is running on port 6767')
})