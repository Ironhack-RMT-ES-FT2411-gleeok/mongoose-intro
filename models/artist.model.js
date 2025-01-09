const mongoose = require("mongoose")

// aqui creamos el schema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true
  },
  awardsWon: {
    type: Number,
    min: 0
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "alternative", "jazz", "folk", "pop", "grunge"]
  },
  similarArtist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist"
  }
})

// aqui creamos el modelo
const Artist = mongoose.model("Artist", artistSchema)
//                                |              |
//        nombre interno del modelo SINGULAR     | 
//                                            el esquema

module.exports = Artist