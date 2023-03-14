'user strict';

var mysql = require('mysql2');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sonct9',
    port     : '3306',
    password : 'sonct9pass',
    database : 'testnodejs_user'
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;