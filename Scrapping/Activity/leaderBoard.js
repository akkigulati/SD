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
let leaderboard = [];
function goto(link) {
    count++;
    req(link, function (err, res, ht) {
        if (res.statusCode == 200 && err == null) {
            //score(ht);
            //count++;
            console.log("////////////////////////////////");
            handleRes(ht);
            count--;
            if (count == 0) {
                console.table(leaderboard);
            }
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
    //  console.log(format);
    format = format.includes("T20") ? "T20" : "ODI"
    let innings = $(".sub-module.scorecard");
    for (let i = 0; i < innings.length; i++) {
        let batsmen = $(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
        nmatch = $(match[i]).html();
        for (let j = 0; j < batsmen.length; j++) {
            let batname = $(batsmen[j]).find(".cell.batsmen");
            let run = $(batsmen[j]).find(".cell.runs");
            // console.log(batname.text() + " " + run.html());
            handleP(format, nmatch, batname.text(), run.html());

        }
    }

    function handleP(format, match, name, run) {
        run = Number(run);
        for (let i = 0; i < leaderboard.length; i++) {
            let obj = leaderboard[i];
            if (obj.name == name && obj.format == format && obj.team == match) {
                obj.runs += run;
                return;
            }

        }
        let pobj = {
            runs: run,
            format: format,
            name: name,
            team: match

        }
        leaderboard.push(pobj);
    }


    // console.log("#########################################");


}
