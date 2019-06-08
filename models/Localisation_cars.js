const mongoose = require("mongoose");

const LOC = mongoose.model("LOC", {
  localisation: {
    type: Array,
    default: [],
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  etat: {
    type: String
  },
  cars: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CAR"
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER"
  }
});
module.exports = LOC;
