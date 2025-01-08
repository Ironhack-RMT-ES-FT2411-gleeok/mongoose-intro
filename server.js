require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// conectarnos a la DB
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/artists-db")
.then(() => {
  console.log("todo bien, conectados a la DB")
})
.catch((error) => {
  console.log("problemas conectando con la DB", error)
})

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array

const Artist = require("./models/artist.model.js")

// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

// ejemplo de ruta para entender body, queries, params
app.get("/book/:bookId/:authorId", (req, res) => {

  // como nosotros accedemos desde el servidor al el valor del id
  // req.params
  console.log("req.params", req.params)

  // req.query
  console.log("req.query", req.query)
  
  // req.body
  console.log("req.body", req.body)

  res.json("probando")
})

// ruta para crear artistas
app.post("/artist", (req, res) => {

  console.log(req.body)  

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// ejemplo de ruta para entender querying en base de datos a traves de mongoose
app.get("/artist/is-touring", (req, res) => {

  // Artist.find( { $and: [ {isTouring: true}, {awardsWon: { $gte: 50 } } ] } )
  Artist.find( { isTouring: true } )
  .then((response) => {
    res.json(response)
  })  
  .catch((error) => {
    console.log(error)
  })

})

// ruta para usar queries y permitir al cliente filtrar en la base de datos de cualquier forma
app.get("/artist/search", (req, res) => {

  console.log("accediendo a la ruta")
  console.log(req.query)

  Artist.find( req.query ).select({ name: 1,  awardsWon: 1}).limit(3)
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// ruta para detalles de un artista por id
app.get("/artist/:artistId", (req, res) => {

  console.log(req.params)

  Artist.findById( req.params.artistId )
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})

// ruta de borrar artista
app.delete("/artist/:artistId", async (req, res) => {



  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.json("todo bien, documento borrado")

  } catch (error) {
    console.log(error)
  }

})

// ruta de editar totalmente artista
app.put("/artist/:artistsId", async (req, res) => {

  console.log(req.params)
  console.log(req.body)

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistsId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    })

    res.json("todo ok, documento editado")

  } catch (error) {
    console.log(error)
  }

})

// ejemplo de rutas patch para diferentes ediciones parciales de artista
app.patch("/artist/:artistId/increment-award", async (req, res) => {

  try {

    await Artist.findByIdAndUpdate(req.params.artistId, {
      $inc: { genre: 1 }
      // $push: { genre: "pop" }
      // $pull: { genre: "rock" }
    })

    res.json("incrementado valor de awards en 1")
    
  } catch (error) {
    console.log(error)
  }

})


// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
