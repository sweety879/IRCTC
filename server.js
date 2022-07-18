var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")
var multer = require('multer')
const cookieParser = require("cookie-parser")
var upload = multer()

var app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(upload.array())
app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static('./static/'));

var stations = require("./stations.js");
app.use("/stations",stations)



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.get('/send_data', function (req, res) {  
    //console.log(req.query)
            res.end(`<div class="container">
            <div style="content: center;">
                <div class="display-area" style="border-style: solid; width: 28%">
                        <b>To</b> : ${req.query.to} <br>
                        <b>From</b> : ${req.query.from}<br>
                        <b>Coach</b> : ${req.query.coach}<br>
                    <div id="actual-price">  actual price: ${req.query.actual_price}
                    </div> 
                    <div id="gst"> gst: ${req.query.GST}
                    </div>
                    <div id="total-price"> total price: ${req.query.total_price}
                    </div> 
                </div>           
            </div>
        </div>`) 
 })  

var server = app.listen(8000, function () {  
    var host = server.address().address  
      var port = server.address().port  
     console.log("Example app listening at http://%s:%s", host, port)  
    })