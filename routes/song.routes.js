const express = require("express")
const router = express.Router()

// Rutas de canciones

// POST "/api/song" => crear canciones
router.post("/", async (req, res) => {

  try {
    await Song.create({
      title: req.body.title,
      releasedDate: req.body.releasedDate,
      artist: req.body.artist,
      collaboratingArtists: req.body.collaboratingArtists
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }

})

// GET "/api/song" => buscar todas las canciones y artistas
router.get("/", async (req, res, next) => {

  try {
    
    const response = await Song
    .find()
    // .select({title: 1, artist: 1})
    .populate("artist", {name: 1, awardsWon: 1})
    // .populate("collaboratingArtists", {name: 1, awardsWon: 1, similarArtist: 1})
    .populate({
      path: "collaboratingArtists",
      select: {name: 1, awardsWon: 1, similarArtist: 1},
      populate: {
        path: "similarArtist",
        model: "Artist"
      }
    })
    // console.log(patata)

    res.status(200).json(response)

  } catch (error) {
    // next() // salta a la proxima ruta que concuerde
    next(error) // si el next tiene algun argumento, entonces envia la llamada al gestor 500
  }

})

module.exports = router