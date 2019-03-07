/**rock paper scissors
 * in class
 * 3/7/19
 */

const express = require("express");
const app = express();

const port = process.env.PORT || 5000; //checks for heroku port OR use 5000

app.use(express.static("public")); //let all files in 'public' be used anyways

app.listen(port, function () {
  console.log("Listening on port : " + port);
});

