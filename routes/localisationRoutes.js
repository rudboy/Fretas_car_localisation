const express = require("express");
const cors = require("cors");
const router = express.Router();
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());
var isAuthenticated = require("../middlewares/isAuthenticated");
const LOCAL = require("../models/Localisation_cars");
const CARS = require("../models/Cars_model");

router.post("/follow_list", async (req, res) => {
  try {
    const newList = new LOCAL({
      localisation: req.body.localisation,
      etat: req.body.etat,
      cars: req.body.cars,
      creator: req.body.creator
    });
    await newList.save();
    res.json({ message: "Created okay" });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
router.get("/all_trajet", async (req, res) => {
  try {
    const all_key = await LOCAL.find({}.key);
    const alllist = await LOCAL.find();
    res.json(all_key);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
router.post("/trajet2", async (req, res) => {
  let NewParametre = {};
  let NouveauParametre = {};
  let parameter = req.body;
  if ("immat" in parameter) {
    NewParametre.immatriculation = req.body.immat;
  }

  try {
    const selectCar = await CARS.find(NewParametre);
    NouveauParametre.cars = selectCar[0]._id;
    const getTrajet = await LOCAL.find(NouveauParametre).populate("creator");
    res.json(getTrajet);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.post("/trajet", async (req, res) => {
  let NewParametre = {};
  let NouveauParametre = {};
  let parameter = req.body;
  if ("immat" in parameter) {
    NewParametre.immatriculation = req.body.immat;
  }
  if ("etat" in parameter) {
    NouveauParametre.etat = req.body.etat;
  }

  try {
    const selectCar = await CARS.find(NewParametre);
    let tabIdCar = [];
    for (let i = 0; i < selectCar.length; i++) {
      tabIdCar.push(selectCar[i]._id);
    }
    let tabResult = [];
    for (let x = 0; x < tabIdCar.length; x++) {
      NouveauParametre.cars = tabIdCar[x];
      if (req.body.sort === "date-asc") {
        const getTrajet = await LOCAL.find(NouveauParametre)
          .populate("creator")
          .populate("cars")
          .sort({
            date: -1
          });

        tabResult.push(getTrajet[0]);
      } else {
        const getTrajet = await LOCAL.find(NouveauParametre)
          .populate("creator")
          .populate("cars");
        tabResult.push(getTrajet[0]);
      }
    }

    res.json(tabResult);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/delete", async (req, res) => {
  try {
    const deleteproduct = await LOCAL.findById({ _id: req.query.id });
    await deleteproduct.remove();
    res.json("Delete okay");
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
module.exports = router;
