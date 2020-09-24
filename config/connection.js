var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '99844860',
  database: 'express',
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('Connected..!');
  }
});

module.exports = connection;
