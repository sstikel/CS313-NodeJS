function onRequest(request, response) {
  console.log("Request:" + request.url);

  try {
    if (request.url == "/home") {
      //return welcome
      response.writeHead(200, {"content-Type": "text/html"});
      response.write("<html><body>");
      response.write("<h1>Welcome to the Home Page...</h1>");
      response.write("</body></html>");
      response.end();
    }
    else if (request.url == "/getData") {
      //return JSON doc with my name and class
      response.writeHead(200, {"content-Type": "application/json"});
      let userData = {
       name: "Sam",
       class: "CS313"
      }; 
      
      let data = JSON.stringify(userData, null, 2);
      fs.writeFile('userData.json', data, (err) => {
        if (err) throw err;
      });

      console.log(userData);

      fs.readFile('userData.json', (err, data) => {
        if (err) throw err;
        let userData2 = JSON.parse(data);
        response.writeHead(200, {"content-Type": "text/html"});
        response.write("<html><body>");
        response.write("<h1>Name: " + userData2["name"] + 
          "<br>Class: " + userData2["class"] + "</h1>");
        response.write("</body></html>");
        response.end();
      });
      
    }
    else if (request.url == "/dontdoit") {
      response.writeHead(200, {"content-Type": "text/html"});
      response.write("<html><body style='background-color:black;'>");
      response.write("<h1 style='color:red;'>NOW YOU'VE DONE IT!</h1>");
      response.write("</body></html>");
      response.end();
    }
    else {
      response.writeHead(404, {"content-Type": "text/html"});
      response.write("<html><body>");
      response.write("<h1>Page Not Found...</h1>");
      response.write("</body></html>");
      response.end();
    }
  }
  catch (ex)
   {
    //render html page with 404 "Page Not Found"
    console.log(ex);
    response.writeHead(404, {"content-Type": "text/html"});
    response.write("<html><body>");
    response.write("<h1>Page Not Found...</h1>");
    response.write("</body></html>");
    response.end();
  }
}

const http = require("http");
const fs = require('fs');

const server = http.createServer(onRequest);
server.listen(8000);

console.log("The web server is now listening on port 8000");