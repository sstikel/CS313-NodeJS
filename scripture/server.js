const express = require("express");
const app = express();
const controller = require("./controllers/scriptureController.js");

const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("/scriptures", controller.getScriptures);
app.get("/search", controller.searchScriptures);

app.listen(port, function(){
  console.log(`Listening on port: ${port}`);
});