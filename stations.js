var express=require("express");
var router = express.Router();

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
});

var places;
function getStations(){
        var sqlQuery="select * from stations";
        con.query(sqlQuery,function(err,result){
            if(err) throw err;
            places=result;
            // console.log(result);
        })
}

function addStation(data){
    let values=[{data,data}]
        var sqlQuery=`insert into stations (id,name) values ("${data}","${data}");`;
        con.query(sqlQuery,[values], function(err,result){
            if(err) throw err;
            console.log("inserted into table ..!!!")
        })
    getStations();   
}

getStations();


module.exports=router;
router.get("/",function(req,res){
    res.end(JSON.stringify(places))
    // console.log(places,"in stations get api")
})

router.get("/newstation",function(req,res){
    res.sendFile(__dirname+'/newStation.html')
})


router.post("/",function(req,res){
    // console.log("in post functin",req.body.name)
    addStation(req.body.name);
    res.json({message:" New Station is created ..."})
})