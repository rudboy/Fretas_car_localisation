const mongoose = require("mongoose");

const USER = mongoose.model("USER", {
  nom: {
    type: String,
    default: "",
    require: true
  },
  prenom: {
    type: String,
    default: "",
    require: true
  },

  username: {
    type: String,
    default: "",
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    default: ""
  },
  token: String,
  salt: String
});
module.exports = USER;
