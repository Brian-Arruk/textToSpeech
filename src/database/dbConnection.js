const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "database"
  });
  
con.connect(function(err) {
    if(err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.')
});

module.exports = con;