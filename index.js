const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'tanginamoduterte',
    database: 'inventory',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Database connection succeeded.');
    else
        console.log('Database connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express server is running at port number: 3000'));

//Get all items 
app.get('/items',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Items',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an item
app.get('/items/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Items WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an item
app.delete('/items/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM Items WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an item
app.post('/items',(req,res)=>{
    let item = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount =?; \
    CALL ItemsAddOrEdit(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql,[item.id, item.name , item.qty, item.amount],(err,rows,fields)=>{
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Inserted id: ' + element[0].id);
            });
        else
            console.log(err);
    })
});

//Update an item
app.put('/items',(req,res)=>{
    let emp = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount =?; \
    CALL ItemsAddOrEdit(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql,[item.id, item.name , item.qty, item.amount],(err,rows,fields)=>{
        if(!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});