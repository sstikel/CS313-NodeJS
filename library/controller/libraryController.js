/*******************************************************
 * File: libraryController.js
 * Author: Sam Gay
 * Date: 3/16/19
 * Purpose: Controller functions for the library site
 *******************************************************/
const model = require("../model/libraryModel.js");


//login
function login(req, res){
  //TODO
}

//logout
function logout(req, res){
  //TODO
}

//display home
function libraryHome(req, res) {
 //process.location.href("../views/libraryHome.html"); //TODO - href not working
}

//display library - make user specific
function getLibrary(req, res){
  model.getLibrary(function(err, libraryResults){
    // if (err){
    //   data = {
    //     success: false,
    //     message: err
    //   };
    //   res.status(500).json(data);
    // }
    // else{
      data = {
        success: true,
        libraryResults: libraryResults
      };
    //}
  });

  res.json(data);
}

//search library
function search(req, res){
  model.search(req, function(err, result){
    //input 'req' may need formating
    res.json(result);
  });
}

//add library item
function addItem(req, res){
  model.addItem(req, function(err, result){
    //req probably needs to be formatted
    res.json(result);
  });
}

//remove library item
function removeItem(req, res){
  model.removeItem(req, function(err, result){
    //req probably needs to be formatted
    res.json(result);
  });

}




module.exports = {
  login: login,
  logout: logout,
  libraryHome: libraryHome,
  getLibrary: getLibrary,
  search: search,
  addItem: addItem,
  removeItem: removeItem
} //allows the above defined funtions to be used outside of this file