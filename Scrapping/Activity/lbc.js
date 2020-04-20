let req = require("request");
let fs = require("fs");
let cheerio=require("cheerio");
//req("https://www.google.com", function (err, res, html) {

req("https://www.espncricinfo.com/series/19322/commentary/1187683", function (err, res, html) {
if (res.statusCode == 200 && err == null) {
      //  fs.writeFile("index.html", html, function () {
      /*  fs.writeFile("index1.html", html, function () {
            console.log("done");

        })*/
      //  fs.writeFileSync("lastballcom.html",html);
        parseHtml(html);
    }
    else if (err == 404) {
        console.log("Invalid url");

    } else {
        console.log(err);
        console.log(req.statusCode);

    }
}

);
function parseHtml(html){
    let $=cheerio.load(html);
    let com=$(".item-wrapper .description");
    
    console.log($(com[0]).text());
    
}
