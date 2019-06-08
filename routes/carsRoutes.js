const express = require("express");
const cors = require("cors");
const router = express.Router();
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());
var isAuthenticated = require("../middlewares/isAuthenticated");
var uploadPictures = require("../middlewares/uploadPictures");

const CARS = require("../models/Cars_model");

//Ajoute d'une sneaker
// router.post("/add_cars", isAuthenticated, uploadPictures, function(
//   req,
//   res,
//   next
// ) {
//   var obj = {
//     _id: req.body.id,
//     marque: req.body.marque,
//     modele: req.body.modele,
//     immatriculation: req.body.immatriculation,
//     picture: req.picture
//   };

//   try {
//     const newCar = new CARS(obj);
//     newCar.save(function(err) {
//       if (!err) {
//         return res.json("New car Added");
//       } else {
//         return next(err.message);
//       }
//     });
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

router.post("/add_cars", uploadPictures, function(req, res, next) {
  var obj = {
    marque: req.body.marque,
    modele: req.body.modele,
    immatriculation: req.body.immatriculation,
    picture: req.pictures
  };

  try {
    const newCar = new CARS(obj);
    newCar.save(function(err) {
      if (!err) {
        return res.json("New car Added");
      } else {
        return next(err.message);
      }
    });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/all_cars", async (req, res) => {
  try {
    const all_key = await CARS.find({}.key);
    const alllist = await CARS.find();
    res.json(all_key);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Obtenir les infos d'un produit
router.get("/get_cars_info", async (req, res) => {
  try {
    const cars = await CARS.findOne({ _id: req.query.id });
    res.json(cars);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/delete_car", async (req, res) => {
  try {
    const deleteCAR = await CAR.findOne({ token: req.body.immat });
    await deleteCAR.remove();
    res.json("Delete CAr okay");
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/car", async (req, res) => {
  let NewParametre = {};
  let parameter = req.body;
  if ("marque" in parameter) {
    NewParametre.marque = req.body.marque;
  }
  if ("modele" in parameter) {
    NewParametre.modele = req.body.modele;
  }
  if ("title" in parameter) {
    NewParametre.title = new RegExp(req.body.title, "i");
  }
  if ("immat" in parameter) {
    NewParametre.immatriculation = req.body.immat;
  }

  if (req.body.sort === "date-asc") {
    const selectProduct = await PRODUCT.find(NewParametre).sort({
      date: 1
    });
    res.json(selectProduct);
  } else if (req.body.sort === "date-desc") {
    const selectProduct = await PRODUCT.find(NewParametre).sort({
      date: -1
    });
    res.json(selectProduct);
  } else {
    const selectProduct = await CARS.find(NewParametre);
    res.json(selectProduct);
  }
});

module.exports = router;
