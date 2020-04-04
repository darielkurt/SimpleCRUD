const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'tanginamoduterte',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Database connection succeeded.');
    else
        console.log('Database connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express server is running at port number: 3000'));

