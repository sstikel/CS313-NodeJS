const model = require("../models/scriptureModel.js")

function getSciptures(req, res) {
  model.getAllScriptures(function(err, scriptures){
    if (err) {
      data = {
        success: false,
        message: err
      };
      res.status(500).json(data);
    }

    data = {
      success: true,
      scriptures: scriptures
    };

    res.json(data);
  });
  
};

function searchScriptures(req, res){
  const book = req.query.book;
  model.getScripturesForBook(book, function(err, scriptures){
    if (err){
      res.status(500).json({success: false});
      
    }
    else{
      res.json({success: true,
      scriptures: scriptures
    });
    }
  });
};

function createScripture(req, res){
  const book = req.body.book;
  const chapter=req.bdy.chapter;
  const verse = req.body.verse;

  model.createScripture(book, chapter, verse, function(err, newScripture){
    if(err){
      res.status(500).json(err);
    }
    else{
      res.json(newScripture);
    }
  })
}

module.exports = {
  getScriptures: getSciptures,
  searchScriptures: searchScriptures
};