var request = require("request");
var fs = require("fs")
var cheerio = require("cheerio")
request("https://www.espncricinfo.com/series/19322/commentary/1187679", function (err, res, html) {
    if (res.statusCode == 200 && err == null) {
      //  fs.writeFileSync("commentary.html", html)
        parseH(html);
    } else if (res.statusCode == 404) {
        console.log("page not found");


    } else {
        console.log(err);
        console.log(res.statusCode);
    }
}
)
function parseH(html) {
    let $ = cheerio.load(html);
    let lcommentary = $(".item-wrapper").find(".description").html();
   
    console.log(lcommentary);

   fs.writeFileSync("LastCommentary.html", lcommentary);
}