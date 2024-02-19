const express = require("express");
const app = express();
const cors = require("cors");
const Router = require("./routes/APiRouter.js");
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(Router);


module.exports = app;