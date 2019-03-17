/*******************************************************
 * File: libraryController.js
 * Author: Sam Gay
 * Date: 3/16/19
 * Purpose: Controller functions for the library site
 *******************************************************/

//login

//logout

//display home
function libraryHome(req, res) {
  const libraryResults = [
    {id: 1, type: "Book", title: "Rainbow Six"},
    {id: 2, type: "DVD", title: "Braveheart"},
    {id: 3, type: "CD", title: "Awake"},
    {id: 4, type: "BR", title: "The Matrix"}
  ]; //hard coded values instead of linking to db

  res.json(libraryResults);
}

//display library - user specific

//add library item

//remove library item





module.exports = {
  libraryHome: libraryHome
} //allows the above defined funtions to be used outside of this file