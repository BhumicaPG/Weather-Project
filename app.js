const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (res, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //when the user tries to go to my homepage (the root route) the callback function is called ans a response is being send
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apikey = "fddf9a8cf9ae2d02238652062c4ef302";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write("<p>The weather is currently " + desc + "<p>");
      // res.write(
      //   "<h1>The Temperature in " +
      //     query +
      //     " is " +
      //     temp +
      //     " degrees Celcius.</h1>"
      // );
      // res.write("<img src = " + imageURL + ">");
      // res.send();

      res.render("index", {
        place: query,
        temperature: temp,
        descriptionn: desc,
        img: imageURL,
      });
    });
  });
});

app.listen(4000, function () {
  console.log("Server is running on port 4000.");
});
