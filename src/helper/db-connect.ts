const mysql = require("mysql");

const sqlConnect = function () {
  const con = mysql.createConnection({
    host: "db4free.net",
    user: "root",
    password: "hEllo@911",
    database: "sb_erp_api",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return con;
};

export { sqlConnect };
