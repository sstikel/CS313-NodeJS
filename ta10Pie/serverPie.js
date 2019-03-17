const express = require("express");
const app = express();

const controller = require("./controllers/pieController.js"); // ./ tells it to start in current dir
 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3141;//5926535...

app.listen(port, function(){
  console.log("Server listening on: " + port)
});

app.get("/pieTypes", controller.getPieTypes);
app.get("/pie/:id", controller.getPie);

app.post("/pie", controller.createPie);

