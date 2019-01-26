// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'aplicacao',
  database: 'freelancer',
  password: 'dQGAqy2z))6sGJkK'
});

module.exports = connection;