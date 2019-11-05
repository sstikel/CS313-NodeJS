/***
 * Doc: server.js
 * Author: Sam Gay
 * Date: 10/22/19
 * Purpose: Manage requests for library items. Includes uploading info, deleting info, retrieving info, 
 * adding and modifying users, etc.
 * 
 */

const http = require("http");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const{Pool} = require('pg');
//const pgDB = require("pg");
var conString = 'postgres://@localhost/pg_demo_db';
const bcrypt = require('bcrypt');
require('dotenv').config();

var app = express();
app.use(bodyParser.json());

////db connection ////
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
    res.send("Error: " + err);
  }
})
//https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
//end

////  LIBRARY API ////
//GET//
//return full library
app.get("/api/item", function(req, res){
  try{
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - query db for items
    //TODO - request items' info from external api(s)
        //- title
        //- author
        //- format
        //- publish date
    //TODO - return results
  }
  catch(err){
    console.error(err);
    res.send("Error: " + err); //TODO - edit response for presentation to user
  }
});

//return specific library item
app.get("/api/item/:id", function(req, res){
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - query db for item
    //TODO - request item info from external api
    //TODO - return result
      //- only include items found in user library
});

//return general search for specific item
app.get("/api/item/:param", function(req, res){
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - request item search results from external api
    //TODO - query db for item search results in user library
    //TODO - return result
});

//END GET//

//POST//
//create library item
app.post("/api/item", function(req, res){
  try{
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - query db
      //- check if item exists; if not, add to library table
        //- request proper info from external API
      //- create row in composite key table; include user PK and item PK
    //TODO - return result
  }
  catch(err){

  }
});
//END POST//

//PUT//
//TODO - update quantity of user item
app.put("/api/item/:id", function(req, res){
  try{
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - query db: update user quantity
    //TODO - return result

  }
  catch(err){

  }
});
//END PUT//

//DELETE//
//TODO - delete library item
app.delete("/api/item/:id", function(req, res){
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - query db: delete user's item row in composite key table
    //TODO - return result
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
