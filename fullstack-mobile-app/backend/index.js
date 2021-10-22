const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const express = require('express')
const app = express()

app.use(express.json())


app.listen(4500, () => {
	console.log("Server is running on port 4500")
})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const options = {
	note: obj.note,
    title: obj.title,
    author: obj.author,
    media: obj.media,
    option: {
      heart: false,
      pay: false,
      block: false,
      remind: false,
      response: null,
    },
}


