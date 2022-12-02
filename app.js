const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apkId = '6b8023ccbd4c004cae02ee72d78b1398';
    const unit = 'metric';
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apkId +"&units="+unit;
    https.get(url, function(response){
        //console.log(response.statusCode);
        response.on("data", function (data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const description = weatherData.weather[0].description
            const icon =weatherData.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + icon+"@2x.png";
            const temp = weatherData.main.temp;
            //console.log(description, temp);
            res.write("<h1>The Temperature in "+query+" is "+ temp + " degrees Celsius right now.</h1>");
            res.write("<h3>The weather in "+query+" currently is "+ description + ".</h3>");
            res.write("<img src="+iconurl+">");
            res.send();
        })
    })
    //res.send("Server is up and running!!")
})
app.get("/", function(req,res){
    res.sendFile( __dirname + "/index.html")
})

app.post("/", function (req, res){
    console.log("Post request recieved");
})


















app.listen(3000, function(){
    console.log("Server is running on Port 3000");
})