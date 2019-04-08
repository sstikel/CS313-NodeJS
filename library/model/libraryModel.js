/**********************************************************************
 * File: libraryModel.js
 * Author: Sam Gay
 * Date: 3/21/19
 * Purpose: handle data requests from server in regards to library
 * web app for class.
 **********************************************************************/

//Access db
const{Pool} = require('pg');
const express = require("express");
const app = express();
require('dotenv').config();

const dbConnection = process.env.DATABASE_URL;
const pool = Pool({connectionString: dbConnection});

var bcrypt = require('bcrypt');

/////////////LIBRARY////////////////////////////////////
function getLibrary(callback){
  // if (badThings == true) {
  //   err = "Error getting the scriptures..."
  //   callback(err, null);
  // }

  // pool.query("SELECT id, title, sub-title, rating FROM lib.library", function(err, result){
  //   if(err){
  //     callback(err, null);
  //   }
  //   else {
  //     callback(null, results.rows);
  //       }
  // });

  const libraryResults = [
    {id: 1, type: "Book", title: "Rainbow Six"},
    {id: 2, type: "DVD", title: "Braveheart"},
    {id: 3, type: "CD", title: "Awake"},
    {id: 4, type: "BR", title: "The Matrix"}
  ]; //hard coded values instead of linking to db

  callback(null, libraryResults);
}

//search
function search(item, callback){
  var sql = "SELECT id, title, sub-title, rating FROM lib.library WHERE item=$1::text";//TODO - likely need to join tables...
  var params = [item];

  // pool.query(sql, params, function(err, dbResults){
  //   if(err){
  //     throw err;
  //   }
  //   else {
  //     var results = {
  //       success: true,
  //       list: dbResults.rows
  //     };

  //     callback(null, results);
  //   }
  // });

  const searchResults = [
    {id: 1, type: "Book", title: "Rainbow Six"},
    {id: 2, type: "DVD", title: "Braveheart"},
    {id: 3, type: "CD", title: "Awake"},
    {id: 4, type: "BR", title: "The Matrix"}
  ]; //hard coded values instead of linking to db
  callback(null, searchResults);
}

//add
function addItem(item, callback){
  const sql = "INSERT INTO ";
  const params = [];

  var result = {
    success: true,
    item: "need to update..."
  };

  callback(null, result);
}

//remove
function removeItem(item, callback){
  var result = {
    success: true,
    item: "need to update..."
  };
}


///////////////////// USERS ////////////////////////////////
//login
function login(username, password, callback){
  const sql = "SELECT id, username, h_password FROM lib.user";
  //TODO add WHERE username = username
  const params = [username, password];

  pool.query(sql, params, function(err, result){
    if (err) {
      console.log("Error with DB(login).");
      console.log(err);
    }
    else{
      comparePassword = function(password, h_password, callback) {
        bcrypt.compare(password, h_password, function(err, isMatch) {   
            return err == null ?
                callback(null, isMatch) :
                callback(err);
        });
     };

      callback(null, result.rows);
    }
  });
}

//logout
function logout(callback){

}

//createuser
function createUser(username, password, name_first, name_last, callback){

  const h_password = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
       return callback(err, hash);
     });
   });
 };

  const sql = "INSERT INTO users (username, h_password, name_first, name_last) VALUES ($1, $2, $3, $4) RETURNING id";
  const params = [username, h_password, name_first, name_last];

  pool.query(sql, params, function(err, result){
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

module.exports = {
  getLibrary: getLibrary,  
  search: search,
  addItem: addItem,
  removeItem: removeItem,
  createUser: createUser,
  login: login,
  logout: logout
};