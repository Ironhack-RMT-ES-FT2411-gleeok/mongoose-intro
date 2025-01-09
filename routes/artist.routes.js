const express = require("express")
const router = express.Router()

const Artist = require("../models/artist.model.js")

// ruta para crear artistas
router.post("/", (req, res) => {

  console.log(req.body)  

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
    similarArtist: req.body.similarArtist
  })
  .then((response) => {
    res.status(201).json(response)
  })
  .catch((error) => {
    next(error)
  })

})

// ejemplo de ruta para entender querying en base de datos a traves de mongoose
router.get("/is-touring", (req, res) => {

  // Artist.find( { $and: [ {isTouring: true}, {awardsWon: { $gte: 50 } } ] } )
  Artist.find( { isTouring: true } )
  .then((response) => {
    res.status(200).json(response)
  })  
  .catch((error) => {
    next(error)
  })

})

// ruta para usar queries y permitir al cliente filtrar en la base de datos de cualquier forma
router.get("/query", (req, res) => {

  console.log("accediendo a la ruta")
  console.log(req.query)

  Artist.find( req.query ).select({ name: 1,  awardsWon: 1}).limit(3)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    next(error)
  })

})

// ruta para detalles de un artista por id
router.get("/:artistId", (req, res) => {

  console.log(req.params)

  Artist.findById( req.params.artistId )
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((error) => {
    next(error)
  })

})

// ruta de borrar artista
router.delete("/:artistId", async (req, res) => {



  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.sendStatus(202)

  } catch (error) {
    next(error)
  }

})

// ruta de editar totalmente artista
router.put("/:artistsId", async (req, res) => {

  console.log(req.params)
  console.log(req.body)

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistsId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    })

    res.sendStatus(202)

  } catch (error) {
    next(error)
  }

})

// ejemplo de rutas patch para diferentes ediciones parciales de artista
router.patch("/:artistId/increment-award", async (req, res) => {

  try {

    await Artist.findByIdAndUpdate(req.params.artistId, {
      $inc: { genre: 1 }
      // $push: { genre: "pop" }
      // $pull: { genre: "rock" }
    })

    res.sendStatus(202)
    
  } catch (error) {
    console.log(error)
  }

})

module.exports = router