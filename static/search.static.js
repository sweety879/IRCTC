async function fetchStations(){
    var places_to = document.createElement("select");
    var places_from = document.createElement("select");
    places_to.id        ="to";
    places_from.id      ="from";
    places_to.name      ="to";
    places_from.name    ="from";
    places_to.form      ="rail_form";
    places_from.form    ="rail_form";

    await fetch("http://127.0.0.1:8000/stations/")
    .then(response => { return response.json()})
    .then(data => {
        data.forEach(station => {
            places_to.appendChild(new Option(station.id,station.place));
            places_from.appendChild(new Option(station.id,station.place));
        });
    })
    .catch(function(error) {
      console.log(error);
    });  
    document.getElementById("to_options").appendChild(places_to);
    document.getElementById("from_options").appendChild(places_from);
}  



document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("return-date").disabled = true;
    });   
window.onload = function () {
        fetchStations();
        }     


var today=new Date().toISOString().split("T")[0]
document.getElementById("doj").setAttribute("min", today)
document.getElementById("return-date").setAttribute("min",today )

const routes = {
    pune : {
        mumbai : 2000,
        delhi  : 5000
    },
   delhi: {
        mumbai :   4000,
        pune:     5000 
   } ,
   mumbai:{
        delhi: 4000,
        pune:2000
   }
}

// validations of to, from places    
function toFrom(){
    var to=document.getElementById("to").value;
    var from=document.getElementById("from").value;

         if((to.match(/mumbai/gi)=== null && to.match(/delhi/gi)=== null && to.match(/pune/gi)=== null && to!=="")){
            alert("Please enter only Delhi,Pune,Mumbai")
         }
           
          if((from.match(/mumbai/gi)=== null && from.match(/delhi/gi)=== null && from.match(/pune/gi)=== null && from!=="")){
            alert("Please enter only Delhi,Pune,Mumbai")
        }    
        if(to.toLowerCase()===from.toLowerCase()) {
                alert("Mumbai-Delhi,Pune-Mumbai,Delhi-Pune are the only available routes")
            }
        if(to!=="" && from!=="" && document.getElementById("doj").value!==""){ 
            calculatePrices() ; 
        }
}


// round-trip selection of date  enability  
document.getElementById("return").addEventListener("change",(e)=>{
    if(!document.getElementById("return").checked){
         document.getElementById("return-date").disabled = true; 
         document.getElementById("return-date").value ="";
        
    }      
   else
       { document.getElementById("return-date").disabled = false;}
})

// calculating price charges    
function calculatePrices(){
var a_price ;
var temp_price ;
var class_type = document.getElementsByName("coach");
var coach =null;
var to=document.getElementById("to").value;
var from=document.getElementById("from").value;
var dist=routes[to.toLowerCase()][from.toLowerCase()];
var doj=document.getElementById("doj").value

for(i = 0; i < class_type.length; i++) {
        if(class_type[i].checked)
         coach=class_type[i].value;
    }

if(!document.getElementById("return").checked)
        a_price= 2*dist;
else
        a_price=4*dist;   

console.log(document.getElementById("return").checked,a_price)        
temp_price = a_price;

        if(coach == 'ac') 
            temp_price +=  500;
        else if(coach == 'cc') 
            temp_price +=  250;
        else if(coach == 'sleeper') 
            temp_price += 100;

                var gst = 0.18*temp_price;
                var total_price = gst+temp_price;

// document.getElementById("actual-price").innerHTML = " <p> Actual Price:" + a_price.toString() +" </p>";
// document.getElementById("gst").innerHTML = "<p> GST: "+gst.toString() +" </p>";
// document.getElementById("total-price").innerHTML = " <p> Total Price: "+total_price.toString()+" </p>";
document.getElementById("actual_price").value =  a_price;
document.getElementById("GST").value = gst;
document.getElementById("total_price").value = total_price;
} 
