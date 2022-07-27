// ###################################### rendering stations ##################################################

async function fetchStations() {
    var places_to = document.createElement("select");
    var places_from = document.createElement("select");
    places_to.id = "to";
    places_from.id = "from";
    places_to.name = "to";
    places_from.name = "from";
    places_to.form = "rail_form";
    places_from.form = "rail_form";
    places_to.onchange = toFrom;
    places_from.onchange = toFrom;
    places_to.appendChild(new Option("select a station", ""));
    places_from.appendChild(new Option("select a station", ""));

    await fetch("http://127.0.0.1:8000/stations/")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(station => {
                places_to.appendChild(new Option(station.toStation, station.toStation));
                places_from.appendChild(new Option(station.toStation, station.toStation));
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    document.getElementById("to_options").appendChild(places_to);
    document.getElementById("from_options").appendChild(places_from);
}

// ################################### calcualting distance ############################################

async function getDistance(to, from) {
    console.log(to, from)
    await fetch(`http://127.0.0.1:8000/stations/get-distance?to=${to}&from=${from}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((response) => response.json())
        .then((data) => data.distance)
        .catch(function (error) {
            console.log(error);
        });
}

// ################################### On loading DOM ############################################

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("return-date").disabled = true;
});
window.onload = function () {
    fetchStations();
}


var today = new Date().toISOString().split("T")[0]
document.getElementById("doj").setAttribute("min", today)
document.getElementById("return-date").setAttribute("min", today)


// ################################### validations of to, from places  ############################################


async function toFrom() {
    var to = document.getElementById("to").value;
    var from = document.getElementById("from").value;
    console.log(to, from)

    if(to!=="" && from !=="")
    {
        if (to.toLowerCase() === from.toLowerCase()) {
            alert(`${to} - ${from} is not available`)
        }
        else {
            let count=0;
            await fetch(`http://127.0.0.1:8000/stations/get-route?to=${to}&from=${from}`,
                {
                    method:'GET',
                    headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            },
                })
                .then((response) =>  response.json())
                .then((data) => count=data.count)
                .catch(function(error) {
                console.log(error);
                }); 
            if(count===0)
                alert(`${to} - ${from} is not available`) 
            else if (to !== "" && from !== "" && document.getElementById("doj").value !== "") {
                calculatePrices();
            }    
        }
    }

}

// ###################################### round-trip selection of date  enability  ##################################################

document.getElementById("return").addEventListener("change", (e) => {
    if (!document.getElementById("return").checked) {
        document.getElementById("return-date").disabled = true;
        document.getElementById("return-date").value = "";

    }
    else { document.getElementById("return-date").disabled = false; }
})

// ###################################### calculating price charges  ##################################################

async function calculatePrices() {
    var to = document.getElementById("to").value;
    var from = document.getElementById("from").value;
    var dist
    // = await getDistance(to.toLowerCase(),from.toLowerCase())    
    var a_price;
    var temp_price;
    var class_type = document.getElementsByName("coach");
    var coach = null;
    // routes[to.toLowerCase()][from.toLowerCase()];
    await fetch(`http://127.0.0.1:8000/stations/get-distance?to=${to}&from=${from}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((response) => response.json())
        .then((data) => dist = data.distance)
        .catch(function (error) {
            console.log(error);
        });
    console.log("distanc ", dist)
    var doj = document.getElementById("doj").value

    for (i = 0; i < class_type.length; i++) {
        if (class_type[i].checked)
            coach = class_type[i].value;
    }

    if (!document.getElementById("return").checked)
        a_price = 2 * dist;
    else
        a_price = 4 * dist;

    console.log(document.getElementById("return").checked, a_price)
    temp_price = a_price;

    if (coach == 'ac')
        temp_price += 500;
    else if (coach == 'cc')
        temp_price += 250;
    else if (coach == 'sleeper')
        temp_price += 100;

    var gst = 0.18 * temp_price;
    var total_price = gst + temp_price;

    // document.getElementById("actual-price").innerHTML = " <p> Actual Price:" + a_price.toString() +" </p>";
    // document.getElementById("gst").innerHTML = "<p> GST: "+gst.toString() +" </p>";
    // document.getElementById("total-price").innerHTML = " <p> Total Price: "+total_price.toString()+" </p>";
    document.getElementById("actual_price").value = a_price;
    document.getElementById("GST").value = gst;
    document.getElementById("total_price").value = total_price;
}



// const routes = {
//     pune : {
//         mumbai : 2000,
//         delhi  : 5000
//     },
//    delhi: {
//         mumbai :   4000,
//         pune:     5000 
//    } ,
//    mumbai:{
//         delhi: 4000,
//         pune:2000
//    }
// }