var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'imagire',  
        password: 'P@ssword',  
        server: '2016web2-imagire.database.windows.net',  
        // When you connect to Azure SQL Database, you need these next options.  
        options: {encrypt: true, database: '2016web2-13'}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {
      if(err){
        res.render('index', {title: err});
      }else{
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
      }
    }); 
  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement() {  
        request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        connection.execSql(request);  
        
        res.render('index', {title: result });
    }
});

module.exports = router;
