/***
 * Doc: server.js
 * Author: Sam Gay
 * Date: 3/7/19
 * Purpose: create server to handle page requests as needed for the
 * remainder of this semester (Jan - Apr 2019)
 */

//const http = require("http");
//const fs = require('fs');
const express = require("express");
const app = express();

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

app.set("views", "views");
app.set("view engine", "ejs");

//app.use(express.static("public")); //let all files in 'public' be used anyways
app.use(express.static("postage"));
app.post("/postageResult", postageResult);

app.listen(port, function () {
  console.log("Listening on port : " + port);
});

function postageResult(request, response) {
  console.log("Called postageResult...");

  const type = request.query.type;
  console.log("Type: " + type);

  const weight = request.query.weight;
  console.log("Weight: " + weight);

  const params = {
    type: type,
    weight: weight
  };

  response.render("postageResult", params);
}