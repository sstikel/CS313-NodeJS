/***
 * Doc: server.js
 * Author: Sam Gay
 * Date: 3/7/19
 * Purpose: create server to handle page requests as needed for the
 * remainder of this semester (Jan - Apr 2019)
 */

const http = require("http");
const express = require("express");
const app = express();
const controller = require("./library/controller/libraryController.js"); // ./ tells it to start in current dir
require('dotenv').config();

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public")); //let all files in 'public' be used anyways
app.use(express.static("postage"));
app.use(express.static("library/views"));

// app.get("/home", function(){
//   render("./public/home.html");
// })
app.get("/postageResult", postageResult);

////////////////////LIBRARY///////////////////////////////////////////
app.get("/libraryHome", controller.libraryHome);//home
app.get("/library", controller.getLibrary);//display library
//app.get("/library/:id", controller.getLibrary);
//app.post("/library....") //add library item

//login
app.post("/login", controller.login);
//logout
app.post("/logout", controller.logout);
//createUser
app.post("/createUser", controller.createUser);

//////////////////////LISTENER////////////////////////////
app.listen(port, function () {
  console.log("Listening on port : " + port);
});

/////////////////////functions///////////////////////////

function postageResult(request, response) {
  console.log("Called postageResult...");

  const type = request.query.type;
  const weight = request.query.weight;

  const calculateRate = require('./public/JS/calculateRate');
  let rate = calculateRate.calculateRate(type, weight);

  const params = {
    type: type,
    weight: weight,
    rate: rate
  };

  response.render("postageResult", params);
}