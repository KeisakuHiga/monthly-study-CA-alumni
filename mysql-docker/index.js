'use strict';

let mysql = require('mysql');
let connection = mysql.createConnection({
  host : 'localhost',
  user : 'loot',
  password : 'mysql',
  port : 3306,
  database: 'docker_scheme'
});

connection.connect();

connection.query(
  `
  SELECT
    * 
  FROM
    'users'
  ;
`, (err, rows, fields) => {
  if (err) throw err;

  console.log(rows);
});

connection.end();