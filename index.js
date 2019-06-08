require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/carsRoutes");
const localisationRoutes = require("./routes/localisationRoutes");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

app.use(
  body_parser.json({ limit: "100000kb" }),
  productRoutes,
  userRoutes,
  localisationRoutes,
  cors(),
  helmet(),
  compression()
);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/Cars_loc_api",
  {
    useNewUrlParser: true
  }
);
mongoose.set("useCreateIndex", true);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'API");
});

app.listen(process.env.PORT || 5500, () => {
  console.log("server listening");
});
