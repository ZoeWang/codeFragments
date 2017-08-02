	var mysql  = require('mysql');
	var db = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  database : 'meeting',
	  password : '',
	  port: 3306
	});


	module.exports = db;