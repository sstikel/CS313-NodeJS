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

//Request format to: https://isbndb.com/apidocs/v2
//Base URL: api2.isbndb.com
//GET https://api2.isbndb.com/books/the%20hunt%20for%20red%20october?page=2&pageSize=20&beta=0
//--------------------------------
//GET /book/9780134093413 HTTP/1.1
//Host: api2.isbndb.com
//User-Agent: insomnia/5.12.4
//Authorization: YOUR_REST_KEY
//Accept: */*
//--------------------------------
/*
let headers = {
  "Content-Type": 'application/json',
  "Authorization": 'YOUR_REST_KEY'
}

fetch('https://api2.isbndb.com/book/9781934759486', {headers: headers})
  .then(response =&gt; {
      return response.json();
  })
  .then(json =&gt; {
      console.log(json)
  })
  .catch(error =&gt; {
      console.error('Error:', error)
  });
*/

//return full library
app.get("/api/book", async (req, res) => {
  try{
    //TODO - sanatize input

    //verify login info
    if(req.session)
      let sess = req.session.cookie.path;
    else{
      res.send("Please log in.");
      break;
    }
      
    //TODO - query db for items
    let sql = "SELECT title, sub_title, author, year, isbn, qty " +
              "FROM lib.lookup LEFT INNER JOIN lib.library ON (lib.lookup.user = lib.library.user)" +
              "WHERE user = " + sess + ";";

    const result = await pool.query(sql);
    let json = JSON.stringify(result);
    //TODO - return result
      res.send(json);
  }
  catch(err){
    console.error(err);
    console.log(err);
    res.send("Error: " + err); //TODO - edit response for presentation to user
  }
});

//return specific library item
app.get("/api/book/:id", async (req, res) => {
  try{
    //TODO - verify login info
    if(req.session)
      let sess = req.session.cookie.path;
    else{
      res.send("Please log in.")
      break;
    }
    //TODO - sanitize input

    //request item info from external api
    let isbn = req.param.id; //extract from url
    let apiURL = 'https://api2.isbndb.com/book/';
    
    let headers = {
      "Content-Type": 'application/json',
      "Authorization": 'YOUR_REST_KEY'
    }
    
    fetch(apiURL + isbn + "?with_prices=0", {headers: headers})
      .then(response => {
          return response.json();
      })
      .then(json => {
          //console.log(json)
      })
      .catch(error => {
          console.error('Error:', error)
      }); //credit: https://isbndb.com/apidocs/v2

      //return result
      res.send(json);
    }
  catch(err){
    console.error(err);
    console.log(err);
    res.send("Error: " + err); //TODO - edit response for presentation to user
  }
});

//return general search for specific item
app.get("/api/book/:param", async (req, res) => {
    //TODO - verify login info
    //TODO - sanitize input
    //TODO - request item search results from external api
    //TODO - query db for item search results in user library
    //TODO - return result
});

//TODO - /api/movie
//TODO - /api/movie/:id
//TODO - /api/movie/:param

//END GET//

//POST//
//create library item
app.post("/api/item", async (req, res) => {
  try{
    //TODO - verify login info
    //TODO - sanitize input
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
    if(req.session)
      let sess = req.session.cookie.path;
    else{
      res.send("Please log in.")
      break;
    }
    //TODO - sanitize input

    //TODO - query db: 
    let isbn = req.session.cookie.path;
    let sql = "SELECT title, isbn FROM lib.library WHERE isbn = "  + isbn + ";";
    let result = pool.query(sql);
    //TODO - if item not in db
    if(!result){
        //request item data from external api
        let apiURL = 'https://api2.isbndb.com/book/';
        
        let headers = {
          "Content-Type": 'application/json',
          "Authorization": 'YOUR_REST_KEY'
        }
        
        let result = await fetch(apiURL + isbn + "?with_prices=0", {headers: headers})
          .then(response => {
              return response.json();
          })
          .then(json => {
              //console.log(json)
          })
          .catch(error => {
              console.error('Error:', error)
          }); //credit: https://isbndb.com/apidocs/v2
        
        let format;
        if(result.format == book){
          //TODO - Check what type of 'format' is returned by ex. api
          format = 1;
        }
        else
          format = 2;

        let params = [result.title, result.title_long, result.authors[0], result.date_published, format, isbn];

        //add to db item data: title, sub_title, author, year, isbn, format
        sql = "INSERT INTO lib.library(title, sub_title, author, year, format, isbn)" +
              "VALUES($1, $2, $3, $4, $5, $6)" + ";";
        pool.query(sql, params, (err, result) => {
          if (err){
            console.log("Error while inserting into DB...");
            console.log(err);
      
            callback(err, null);
          }
          else {
            console.log("DB insert complete...");
            console.log(result.rows);
      
            callback(null, result.rows);
          }
        });
        
      }
    //TODO - update user quantity
    sql = "SELECT id FROM lib.library WHERE lib.library.isbn = " + isbn + ";";
    let libID = await pool.query(sql);
    sql = "UPDATE lib.lookup SET lib.lookup.qty = lib.lookup.qty + 1" 
          "WHERE lib.lookup.user_id = " + sess + " AND lib.lookup.item_id = " + libID + ";";

    pool.query(sql, (err, result) => {
      //return result
      if(err){
        console.log("Error while inserting into DB...");
        console.log(err);
        res.send("Error updating quantity.")
      }
      else{
        console.log("DB insert complete...");
        console.log(result.rows);
        res.send("Quantity updated.")
      }
    });
  }
  catch(err){
    console.error(err);
    console.log(err);
    res.send("Error: " + err); //TODO - edit response for presentation to user
  }
});
//END PUT//

//DELETE//
//TODO - delete library item
app.delete("/api/item/:id", async (req, res) => {
    //TODO - verify login info
    if(req.session)
      let sess = req.session.cookie.path;
    else{
      res.send("Please log in.")
      break;
    }
    //TODO - sanitize input

    //TODO - query db: delete user's item row in composite key table
    //check if user row exists
    let sql = "SELECT " + ";";
      //yes - decrement
        //TODO - if decrements to zero, delete row
      //no - skip
    //TODO - return result
});
//END DELETE//

////  END LIBRARY API ////
//////////////////// USERS /////////////////////////////////////////
//login
app.get("/api/user/login", async (req, res) => {
  try{
    //retrieve login info from req
    let sess = req.session;
    //TODO - sanitize user input
    //query db 
    let username = req.username;
    let sql = 'SELECT id, h_password FROM lib.user WHERE username=' + username;
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
      let userID = result.rows[0].id;
      sess.cookie.path(userID);
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
  /*try{
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
        else {
          inserted = true;
        }
      });
    }

    //redirect to login  
    if(inserted){  
      res.writeHead(302, {
        'Location':'/api/user/login'
      });
      //res.redirect("/api/user/login");
    }
  }
  catch(err){
    console.log("Error with new user on API");
    console.log(err);
    res.send("Error creating new user;")
  }*/
});
//end create user
//////////////////// END USERS /////////////////////////////////////////

////////////////////// LISTENER ////////////////////////////
app.listen(port, function () {
  console.log("Listening on port : " + port);
});
////////////////////// END LISTENER ////////////////////////////

/////////////////////functions///////////////////////////


