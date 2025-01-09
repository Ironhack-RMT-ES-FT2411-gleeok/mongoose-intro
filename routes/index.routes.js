const express = require("express")
const router = express.Router()


const Song = require("../models/song.model.js")

// "/api" all routes here...
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})

// "/api/book/:bookId/:authorId" ejemplo de ruta para entender body, queries, params
router.get("/book/:bookId/:authorId", (req, res) => {

  // como nosotros accedemos desde el servidor al el valor del id
  // req.params
  console.log("req.params", req.params)

  // req.query
  console.log("req.query", req.query)
  
  // req.body
  console.log("req.body", req.body)

  res.status(200).json("probando")
})

const artistRouter = require("./artist.routes.js")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes.js")
router.use("/song", songRouter)



module.exports = router