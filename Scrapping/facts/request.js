let req = require("request");
let fs = require("fs");
//req("https://www.google.com", function (err, res, html) {

req("https://www.amazon.in", function (err, res, html) {
  
if (res.statusCode == 200 && err == null) {
      //  fs.writeFile("index.html", html, function () {
      /*  fs.writeFile("index1.html", html, function () {
            console.log("done");

        })*/
        fs.writeFileSync("index1.html",html);
    }
    else if (err == 404) {
        console.log("Invalid url");

    } else {
        console.log(err);
        console.log(req.statusCode);

    }
}

);
