const mongoose = require("mongoose");

const RoomsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  reviews: [],
});

module.exports = mongoose.model("Room", RoomsSchema);
