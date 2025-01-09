// conectarnos a la DB
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/artists-db")
.then(() => {
  console.log("todo bien, conectados a la DB")
})
.catch((error) => {
  console.log("problemas conectando con la DB", error)
})