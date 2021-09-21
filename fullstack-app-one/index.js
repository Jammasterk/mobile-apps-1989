const mongoose = require('mongoose')
const express = require('express')
const PORT = 8080
const morgan = require('morgan')
const app = express()
require("dotenv").config()
const config = require('./firebaseConfig')


console.log(config)


app.use(morgan("dev"))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/react-native", {
	useNewUrlParser: true,
	useUnifiedTopology: true
},
()=> console.log("Connected to DB")
)

app.use("/user", require('./routes/userRouter'))

app.listen(PORT, () => console.log(`Connected to DB on PORT ${PORT}`))

