const mysql = require("mysql");

const sqlConnect = function () {
  const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return con;
};

export { sqlConnect };
