const express = require("express");
// var mysql = require('mysql');
const { sqlConnect } = require("./helper/db-connect");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const {router} = require('./routes/auth.routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = sqlConnect();

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(100) NOT NULL)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO users (name, email, password) VALUES ('Dev1', 'dev1@gmail.com', 'hEllo@911')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

// con.query("SELECT * FROM users", function (err, result, fields) {
//   if (err) throw err;
//   // console.log(result);
//   result.forEach((result) => {
//     console.log(result);
//   });
// });

app.get("/sb-erp-api", (req, res) => {
  res.send("Hello World!");
});

app.use('/sb-erp-api/', router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
