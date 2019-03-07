/**rock paper scissors
 * in class
 * 3/7/19
 */

const express = require("express");
const app = express();

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public")); //let all files in 'public' be used anyways

app.get("/playGame", handlePlayGame); //would be app.post if using post

app.listen(port, function () {
  console.log("Listening on port : " + port);
});

function handlePlayGame(request, response) {
  console.log("playGame...");
  const playWeapon = request.query.playWeapon;
  console.log("Using: " + playWeapon);

  const cpuWeapon = "Scissors";
  const winner = "Player";

  const params = {
    playWeapon: playWeapon, 
    cpuWeapon: cpuWeapon, 
    winner: winner};

  response.render("results", params);

}