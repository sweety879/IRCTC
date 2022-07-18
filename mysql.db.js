var mysql = require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"IRCTC"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!!!")
    // con.query("Create Database IRCTC",function(err,result){
    //             if(err) throw err;
    //         console.log("Database Created!!!")
    //         })   

    var sqlQuery="create table stations(id varchar(40), name varchar(40))";
    con.query(sqlQuery, function(err,result){
        if(err) throw err;
        console.log("Table Created..!!!")
    })
        
    var sqlQuery="insert into stations (id,name) values ?";
    var values = [
        ["Mumbai","Mumbai"],
        ["Pune","Pune"],
        ["Delhi","Delhi"]
    ]
    con.query(sqlQuery,[values], function(err,result){
        if(err) throw err;
        console.log("inserted into table ..!!!")
    })
})

// var sqlQuery="insert into movies (id,name,year) values (1,'RRR',2022)";
//     con.query(sqlQuery, function(err,result){
//         if(err) throw err;
//         console.log("inserted into table ..!!!")
//     })

// var sqlQuery="create table movies(id int(10), name varchar(20), year varchar(20))";
//     con.query(sqlQuery, function(err,result){
//         if(err) throw err;
//         console.log("Table Created..!!!")
//     })

//     con.query("Create Database newExpress",function(err,result){
//         if(err) throw err;
//     console.log("Database Created!!!")
//     })    


// //Select From Table
// con.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!!!")
//     var sqlQuery="select * from movies";
//     con.query(sqlQuery,function(err,result){
//         if(err) throw err;
//         console.log(result)
//     })
// })