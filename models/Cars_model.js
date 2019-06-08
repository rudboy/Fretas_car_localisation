const mongoose = require("mongoose");

const CARS = mongoose.model("CAR", {
  immatriculation: {
    type: String,
    require: true,
    unique: true
  },
  marque: {
    type: String,
    default: "",
    require: true
  },
  modele: {
    type: String,
    default: ""
  },
  picture: {
    type: Array,
    default:
      "https://cdn.pixabay.com/photo/2018/05/22/01/37/icon-3420270_960_720.png",
    require: true
  }
});
module.exports = CARS;
