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
//var conString = 'postgres://@localhost/pg_demo_db';
const bodyParser = require("body-parser");
const{Pool} = require('pg');
//Pool -- https://node-postgres.com/api/pool
//const pgDB = require("pg");
const bcrypt = require('bcrypt');
// bcrypt -- https://www.npmjs.com/package/bcrypt
require('dotenv').config();

var app = express();
app.use(bodyParser.json());
const dbConnection = process.env.DATABASE_URL;
const pool = new Pool({connectionString: dbConnection});

////db connection ////
////session////
//https://codeforgeek.com/manage-session-using-node-js-express-4/
app.use(require('morgan')('dev'));
const session = require('express-session');
//express-session -- https://www.npmjs.com/package/express-session
const FileStore = require('session-file-store')(session);
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: false,
  resave: true,
  store: new FileStore()}));
app.use(express.urlencoded());
app.use(express.json());

//end

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

//Homepage from CS313
app.get("/home", function(req, res){
  res.redirect("home.html");
});

//////////////////////////////  LIBRARY API //////////////////////////////
//GET//

//return full library
app.get("/api/item", async (req, res) => {
  try{
    //TODO - sanatize input
    //TODO - verify login info
      //TODO - if cookie: compare cookies
      //TODO - else: redirect to login
      
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
    console.log(err);
    res.send("Error: " + err); //TODO - edit response for presentation to user
  }

  /*
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
  */

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

////  END LIBRARY API ////
//////////////////// USERS /////////////////////////////////////////
//login
app.get("/api/user/login", async (req, res) => {
  try{
    //TODO - retrieve login info from req
    let sess = req.session;
    //TODO - sanitize user input
    let username = req.username;
    //query db 
    let sql = 'SELECT h_password FROM lib.user WHERE username=' + username;
    let h_password;
    pool.query(sql, username, (err, result) => {
      if(err){
        console.log("Error with DB(login/username)");
        console.log(err);
      }    
      else
        h_password = result.rows[0].h_password;
    });
    //compare hashed passwords
    let match = await bcrypt.compare(req.password, h_password);
    if(match){
      //set cookie
      sess.cookie.path('/api/item');
       //return result
      res.send("User Authenticated.");
    }
    else
      res.send("Login info incorrect.")   
  }
  catch (err){
    console.log("Error with API login");
    console.log(err);
  }
});
//end login

//logout
app.get("/api/user/logout", async (req, res) => {
  try{
    //deauthorize cookie/token/etc.
    let sess = req.session;
    sess.destroy((err) => {
      if(err){
        console.log("error with API logout: " + err);
        return "An error has occured in Logout.";
      }
    });
    //TODO - return result (logout confirmation)
    res.send("Logout complete");
  }
  catch(err){
    console.log("Error with API logout");
    console.log(err);
  }
});
//end logout
//create user
app.put("/api/user/newuser", async (req, res) => {
  try{
    let inserted = false;
    var hash = "";
    //TODO - sanatize input
    let username = req.username;
    let password = req.password;
    let name_first = req.name_first;
    let name_last = req.name_last;
    //query db -- store username, h_password, first and last names
    bcrypt.hash(password, 10, (err, hash) => {
      const sql = "INSERT INTO lib.user (username, h_password, name_first, name_last) VALUES ($1, $2, $3, $4)";
      const params = [username, h_password, name_first, name_last];
  
      pool.query(sql, params, (err, result) => {
        if (err){
          console.log("Error inserting new user into DB.");
          console.log(err);
        }
        else 
          inserted = true;
      });
    }
    //redirect to login  
    if(inserted){  
      res.writeHead(302, {
        'Location': "/api/user/login"
      });
      //res.redirect("/api/user/login");
    }
  }
  catch(err){
    console.log("Error with new user on API");
    console.log(err);
    res.send("Error creating new user;")
  }
});
//end create user
//////////////////// END USERS /////////////////////////////////////////

////////////////////// LISTENER ////////////////////////////
app.listen(port, function () {
  console.log("Listening on port : " + port);
});
////////////////////// END LISTENER ////////////////////////////

/////////////////////functions///////////////////////////


