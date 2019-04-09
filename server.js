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
app.use(require('morgan')('dev'));
var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()}));
require('dotenv').config();

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public")); //let all files in 'public' be used anyways
app.use(express.static("postage"));
app.use(express.static("library/views"));

app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json());

app.get("/home", function(req, res){
  res.redirect("home.html");
})

//////////////////// POSTAL ///////////////////////////////////////////
app.get("/postageResult", postageResult);

//////////////////// LIBRARY ///////////////////////////////////////////
app.get("/libraryHome", controller.libraryHome);//home
app.get("/library", controller.getLibrary);//display library
//app.get("/library/:id", controller.getLibrary);
//app.post("/library....") //add library item

//////////////////// USERS /////////////////////////////////////////
//login
app.get("/login", controller.login);
app.post("/login", controller.handleLogin);
//logout
app.get("/logout", controller.logout);
//createUser
app.post("/createUser", controller.createUser);

////////////////////// LISTENER ////////////////////////////
app.listen(port, function () {
  console.log("Listening on port : " + port);
});


/////////////////////functions///////////////////////////
////////// Postal //////////////////
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