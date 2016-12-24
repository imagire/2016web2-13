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
        request = new Request("SELECT TOP(10) CustomerID, CompanyName FROM SalesLT.Customer;", function(err) {
        if (err) {  
            console.log(err);}  
        });  
        var result = '<table>';  
        request.on('row', function(columns) {  
          result += '<tr>'; 
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= '<td>' + column.value + '</td>';  
              }  
          result += '</tr>'; 
            }); 
//            console.log(result);  
//            result ="";  
        });  
  
        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
        result += "</table>";
        console.log(result +  ######');  
        render('index', {title:"my first DB access", message:result});
        });  
        connection.execSql(request);  
    }
});

module.exports = router;
