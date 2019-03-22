// const{Pool} = require("pg");
// const conn = "something...";
// pool = Pool({connectionSttrin: conn});

function getAllScriptures(callback){

  // if (badThings == true) {
  //   err = "Error getting the scriptures..."
  //   callback(err, null);
  // }

  // pool.query("SELECT id, book, chapter, verse FROM scripture", function(err, result){
  //   if(err){
  //     callback(err, null);
  //   }
  //   else {
  //     callback(null, results.rows);
  //       }
  // });

  const scriptures = [
      {id: 1, book: "Helaman", chapter: 5, verse: 12},
      {id: 2, book: "John", chapter: 11, verse: 2},
      {id: 3, book: "Ether", chapter: 12, verse: 62}
    ];

  callback(null, scriptures);
};

function getScripturesForBook(book, callback) {
  const scriptures = [
    {id: 1, book: "Helaman", chapter: 5, verse: 12},
    {id: 2, book: "Helaman", chapter: 11, verse: 2},
    {id: 3, book: "Helaman", chapter: 12, verse: 62},
  ];//hard code -- replace with db call
}

function createScripture(book, chapter, verse, callback){
  const theNewScriptureFromTheDb = "";
  callback(err, theNewScriptureFromTheDb);
}

module.exports = {
  getAllScriptures: getAllScriptures,
  getScripturesForBook: getScripturesForBook,
  createScripture: createScripture
};