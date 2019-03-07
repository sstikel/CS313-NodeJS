/***
 * Doc: server.js
 * Author: Sam Gay
 * Date: 3/7/19
 * Purpose: create server to handle page requests as needed for the
 * remainder of this semester (Jan - Apr 2019)
 */

const http = require("http");
const fs = require('fs');
const express = require("express");
const app = express();

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public")); //let all files in 'public' be used anyways
app.use(express.static("postage"));

app.listen(port, function () {
  console.log("Listening on port : " + port);
});