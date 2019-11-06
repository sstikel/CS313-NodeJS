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
const bcrypt = require('bcrypt');
require('dotenv').config();

var app = express();
app.use(bodyParser.json());

////db connection ////
////session////
//https://codeforgeek.com/manage-session-using-node-js-express-4/
app.use(require('morgan')('dev'));
const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()}));
app.use(express.urlencoded());
app.use(express.json());
require('dotenv').config();

//Heroku OAuth
//https://github.com/heroku/node-heroku-client
const Heroku = require('heroku-client');
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });

//Heroku pg db access - 10/22/19
var conString = 'postgres://@localhost/pg_demo_db';
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
app.get("/api/item", async (req, res) => {
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
app.get("/api/item/:id", async (req, res) => {
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - query db for item
    //TODO - request item info from external api
    //TODO - return result
      //- only include items found in user library
});

//return general search for specific item
app.get("/api/item/:param", async (req, res) => {
    //TODO - verify login info
    //TODO - sanatize input
    //TODO - request item search results from external api
    //TODO - query db for item search results in user library
    //TODO - return result
});

//END GET//

//POST//
//create library item
app.post("/api/item", async (req, res) => {
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
app.put("/api/item/:id", async (req, res) => {
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
app.delete("/api/item/:id", async (req, res) => {
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
  //authenticate
app.get("/api/user/login", async (req, res) => {
  try{
    //TODO - retrieve login info from req
    let currentSession = req.session;
    //TODO - sanitize clientID
    currentSession.clientID = req.body.clientID;
    currentSession.scope = 'read';
    currentSession.state = '???';
    //GET https://id.heroku.com/oauth/authorize?client_id={client-id}&response_type=code&scope=read&state={anti-forgery-token}
    let herokuURL = "https://id.heroku.com/oauth/authorize?client_id=" + clientID + "&response_type=code&scope=" + scope + "&state=" + state;

    //TODO - redirect to Heroku OAuth API
    res.redirect(herokuURL);
    
    //TODO - store cookie + clientID to db???
    //TODO - return result (including cookie)
    res.end("User Authenticated.");
  }
  catch (err){

  }
});

  //already authenticated
app.post("/api/user/login", async (req, res) => {
  try{
    //TODO - retrieve login info from req
    let currentSession = req.session;
    //TODO - compare cookie
    //TODO - return result
  }
  catch (err){

  }
});
//end login
//logout
app.get("/api/user/logout", async (req, res) => {
  try{
    //TODO - deauthorize cookie/token/etc.
    req.session.destroy((err) => {
      if(err){
        console.log("error: " + err);
        return "An error has occured in Logout.";
      }
    });
    //TODO - return result (logout confirmation)
  }
  catch(err){

  }
});
//end logout
//create user

//end create user
//////////////////// END USERS /////////////////////////////////////////

////////////////////// LISTENER ////////////////////////////
app.listen(port, function () {
  console.log("Listening on port : " + port);
});
////////////////////// END LISTENER ////////////////////////////

/////////////////////functions///////////////////////////
