let req = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
//req("https://www.google.com", function (err, res, html) {

req("https://www.espncricinfo.com/series/19322/scorecard/1187683", function (err, res, html) {
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
function parseHtml(html) {
    let $ = cheerio.load(html);
    let com = $(".scorecard-section.bowling table tbody tr");
    let mostwic = 0;
    let hname = "";
    for (let i = 0; i < com.length; i++) {
        let name = $(com[i]).find("td a").text();
        let wick = $($(com[i]).find("td")[5]).text();
        if (wick > mostwic) {
            mostwic = wick;
            hname = name;
        }
    } 
    console.log(hname+":"+mostwic);
    

}
