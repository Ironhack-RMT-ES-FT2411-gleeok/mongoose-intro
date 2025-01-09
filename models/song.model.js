const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
  title: String,
  releasedDate: Date,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist"
  },
  collaboratingArtists: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: "Artist"
  }
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song