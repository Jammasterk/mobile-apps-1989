const mongoose = require('mongoose')
const express = require('express')
const PORT = 8080
const morgan = require('morgan')
const app = express()
require("dotenv").config()
const expressJwt = require('express-jwt')

app.use(morgan("dev"))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/react-native", {
	useNewUrlParser: true,
	useUnifiedTopology: true
},
()=> console.log("Connected to DB")
)

app.use('/auth', require('./routes/authRouter.js'))
app.use(
  "/api",
  expressJwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

app.use("/api/user", require('./routes/userRouter'))
app.use("/api/post", (require('./routes/postRouter')))

app.listen(PORT, () => console.log(`Connected to DB on PORT ${PORT}`))

