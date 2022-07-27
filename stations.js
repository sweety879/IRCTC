var express=require("express");
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({
    host:"127.0.0.1",
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
        var sqlQuery="select distinct(toStation) from routes";
        con.query(sqlQuery,function(err,result){
            if(err) throw err;
            places=result;
             console.log(result);
        })
}



function addStation(data){
    let values=[[data.toStation,data.fromStation,data.distance],[data.fromStation,data.toStation,data.distance]]
        var sqlQuery="insert into routes (toStation,fromStation,distance) values ?;";
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

router.get("/newroute",function(req,res){
    res.sendFile(__dirname+'/newRoute.html')
})


router.get("/get-distance",function(req,res){
    var sqlQuery=`select distance from routes where toStation="${req.query.to}" and fromStation="${req.query.from}"`;
        con.query(sqlQuery,function(err,result){
            if(err) throw err;
            //  console.log("result ",result[0],"distance ",result[0].distance);
            res.json({distance:result[0].distance});
        })
})

router.get("/get-route",function(req,res){
    var sqlQuery=`select count(*) from routes where toStation="${req.query.to}" and fromStation="${req.query.from}"`;
        con.query(sqlQuery,function(err,result){
            if(err) throw err;
             console.log("result ",result[0]["count(*)"]);
            res.json({count:result[0]["count(*)"]});
        })
        // res.json({distance:dist});
})


router.post("/",function(req,res){
    // console.log("in post functin",req.body.name)
    let data =  {toStation:req.body.toStation,fromStation:req.body.fromStation,distance:req.body.distance}
    console.log(data)
    addStation(data);
    res.json({message:" New Station is created ..."})
})