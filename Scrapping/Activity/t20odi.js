let req = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
//req("https://www.google.com", function (err, res, html) {

req("https://www.espncricinfo.com/scores/series/19322", function (err, res, html) {
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
        console.log(res.statusCode);

    }
}

);
function parseHtml(html) {
    let $ = cheerio.load(html);
    let cards = $(".cscore.cscore--final.cricket.cscore--watchNotes");
    for (let i = 0; i < cards.length; i++) {
        let matchType = ($(cards[i]).find(".cscore_info-overview").html());
        if (matchType.includes("ODI") || matchType.includes("T20")) {
            link = ($(cards[i]).find(".cscore_buttonGroup ul li a").attr("href"));
            goto("https://www.espncricinfo.com" + link)
        }
    }

}
let count = 0;
function goto(link) {
    req(link, function (err, res, ht) {
        if (res.statusCode == 200 && err == null) {
            //score(ht);
            //count++;
            handleRes(ht);
            //console.log("m");

        }
        else if (err == 404) {
            console.log("Invalid url");

        } else {
            console.log(err);
            console.log(res.statusCode);

        }
    })
}
function handleRes(html) {
    let $ = cheerio.load(html);
    let format = $(".cscore.cscore--final.cricket .cscore_info-overview").html();
    let match = $(".sub-module.scorecard h2");
    console.log(format);
    let innings = $(".sub-module.scorecard");
    for (let i = 0; i < innings.length; i++) {
        let batsmen = $(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
        console.log("\n"+$(match[i]).html()+"\n");
        for (let j = 0; j < batsmen.length; j++) {
            let batname = $(batsmen[j]).find(".cell.batsmen");
            let run =$(batsmen[j]).find(".cell.runs");
            console.log(batname.text()+" "+run.html());
            
            
     }
    }


    
    console.log("#########################################");


}