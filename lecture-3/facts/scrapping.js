var request = require("request");
var fs = require("fs")
var cheerio = require("cheerio")
request("https://www.espncricinfo.com/series/19322/scorecard/1187679", function (err, res, html) {
    if (res.statusCode == 200 && err == null) {
        fs.writeFileSync("score.html", html)
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
    let tableH = $(".scorecard-section.bowling table tbody tr");
    let tablehtml = ""
    let max=0;
    let wicket=0
    let bestbowler="";
    for (var i = 0; i < tableH.length; i++) {
        //to view scoretables of the match.

        //tablehtml += $(tableH[i]).html() + "</br>";
        
        
        let bowler=$(tableH[i]).find("td a").html();
        
        let wicket=$($(tableH[i]).find("td")[5]).html();
        if(wicket>max){
            max=wicket;
            //best bowler of the match with wickets.
            bestbowler=bowler
       }

    }

    console.log(bestbowler+" "+max);

 //   fs.writeFileSync("scoreB.html", tablehtml);
}