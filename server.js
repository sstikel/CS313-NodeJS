/***
 * Doc: server.js
 * Author: Sam Gay
 * Date: 10/22/19
 * Purpose: 
 * 
 */

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const pgDB = require("pg");
const bcrypt = require('bcrypt');

var LIBRARY_DATA = "lib.library"; //TODO - how is this used??
var db;
var app = express();
app.use(bodyParser.json());

////db connection ////
//TODO - broken here. appears to be a mongo styled request
//TODO - Change to mongodb????
pgDB.???``.connect(process.env.DATABASE_URL, function(err, client){
  if(err){
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Db connection created.");

  var server = app.listen(process.env.PORT, function(){
    var port = server.address().port;
    console.log("Running on ", port);
  });
});

////session////
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

//Heroku pg db access - 10/22/19
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var LIBRARY_DATA = "lib.library";
var db;

//connect to db
//end

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000



app.use(express.urlencoded());
app.use(express.json());


app.get("/home", function(req, res){
  res.redirect("home.html");
})

//////////////////// LIBRARY ///////////////////////////////////////////
app.get("/libraryHome", controller.libraryHome);//home
app.get("/library", controller.getLibrary);//display library
//app.get("/library/:id", controller.getLibrary);
//app.post("/library....") //add library item

// - 10/22/19
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table'); //TODO - mod. needed
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
//https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
//end

////  LIBRARY API ////
//GET//
//return full library
app.get("/api/item", function(req, res){
  
});

//return specific library item
app.get("/api/item/:id", function(req, res){
  
});

//TODO - return friend's full library
//TODO - return friend's specific library item
//END GET//

//POST//
//create library item
app.post("/api/item", function(req, res){
  
});
//END POST//

//PUT//
//TODO - update library item
app.put("/api/item/:id", function(req, res){
  
});
//END PUT//

//DELETE//
//TODO - delete library item
app.delete("/api/item/:id", function(req, res){
  
});
//END DELETE//


//https://devcenter.heroku.com/articles/mean-apps-restful-api
////  END LIBRARY API ////

//////////////////// END LIBRARY ///////////////////////////////////////////

//////////////////// USERS /////////////////////////////////////////
//login
app.get("/login", controller.login);
app.post("/login", controller.handleLogin);
//logout
app.get("/logout", controller.logout);
//createUser
app.post("/createUser", controller.createUser);
//////////////////// END USERS /////////////////////////////////////////

////////////////////// LISTENER ////////////////////////////
app.listen(port, function () {
  console.log("Listening on port : " + port);
});
////////////////////// END LISTENER ////////////////////////////

/////////////////////functions///////////////////////////
