const express = require("express");
const { sqlConnect } = require("./helper/db-connect");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config("../.env");
const port = 3000;
const { router } = require("./routes/auth.routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = sqlConnect();

app.get("/sb-erp-api", (req, res) => {
  res.send("Hello World!");
});

app.use("/sb-erp-api/", router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
