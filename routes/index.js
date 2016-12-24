var express = require('express');
var router = express.Router();

var Connection = require('tedious').Connection;  
var config = {  
    userName: 'imagire',  
    password: 'P@ssword',  
    server: '2016web2-imagire.database.windows.net',  
    // If you are on Microsoft Azure, you need this:  
    options: {encrypt: true, database: 'AdventureWorks'}  
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
// If no error, then good to proceed.  
	if(err){
        res.send(err);
    }else {  
        res.send("Connected");
    }  
    executeStatement();  
});  


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
