let puppeteer = require("puppeteer");
let fs = require("fs");
let request = require("request");
(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            slowMo: 50,
            args: ["--start-maximized", "--disable-notifications"]
        })

        tabs = await browser.pages();
        let newsUrl = process.argv[2]
        let num = process.argv[3]

        news = await fetchNews(tabs, newsUrl, num)
        console.log(news);
        //STORING NEWS DATA IN NEWS.JSON FILE
        fs.writeFile("News.json", JSON.stringify(news), function () {
            console.log("News Data Stored");
        });
        let FbCredential = process.argv[4]

        await Fbupdate(tabs, news, FbCredential)

    } catch (err) {
        console.log(err);
    }
})();

//SCRAPPING  NEWS
async function fetchNews(tab, url, num) {

    tab = tab[0];

    // GOING TO INDIA TODAY NEWS CHANNEL
    await tab.goto(url, { waituntil: "networkidle2" });
    // OPENING TRENDING NEWS
    await Promise.all([
        tab.click("div[data-tb-region=HomeTrending] .morediv a"), tab.waitForNavigation({
            waitUntil: "networkidle2"
        })
    ])

    // FETCHING HEADLINES & LINK TO THE NEWS
    let headLines = await tab.$$(".view-content .catagory-listing .detail h2 a")

    let news = []
    for (let i = 0; i < num; i++) {
        let trending = {};
        let text = await tab.evaluate(function (el) {
            return el.innerText;
        }, headLines[i]);
        //console.log(text);
        trending.headline = text;
        let href = await tab.evaluate(function (el) {
            return el.getAttribute("href");
        }, headLines[i]);
        //console.log("https://www.indiatoday.in" + href);
        trending.url = "https://www.indiatoday.in" + href;
        news.push(trending);
    }

    //VISITING EACH LINK TO DOWNLOAD IMAGE.
    for (let i = 0; i < news.length; i++) {
        await tab.goto(news[i].url, { waituntil: "networkidle2" });
        let pictag = await tab.$$(".stryimg img")
        // console.log(pictag);

        let src = await tab.evaluate(function (el) {
            return el.getAttribute("src");
        }, pictag[0]);
        //console.log(src);

        //DOWNLOADING IMG OF THE NEWS
        await download(src, `image${i}.jpeg`, function () {
            console.log("Image downloaded");
        });
        news[i].img = `image${i}.jpeg`;
    }
    return news;
}

//IMAGE DOWNLOAD FUNCTION
function download(uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
    });
}

//Fbupdate UPLOADS THE NEWS ON FB WITH IMAGE.
async function Fbupdate(tab, news, FbCredential) {
    let credentialsFile = await fs.promises.readFile(FbCredential);
    let { user, pass, url } = JSON.parse(credentialsFile);
    tab = tab[0];
    //LOGIN
    await tab.goto(url, { waituntil: "networkidle2" });
    await tab.waitForSelector("input[type=email]");
    await tab.type("input[type=email]", user, { delay: 100 });
    await tab.type("input[type=password]", pass, { delay: 100 });
   
    await Promise.all([
        tab.click(".login_form_login_button"), tab.waitForNavigation({
            waitUntil: "networkidle2"
        })
    ])
    //UPDATING STATUS
    for (let i = 0; i < news.length; i++) {

        await tab.goto(url, { waituntil: "networkidle2" });
        let headline = news[i].headline + "\n Follow this link for full Story:\n" + news[i].url;

        //  await tab.waitForSelector("br[data-text=true]");
        await tab.click("textarea[name=xhpc_message]")

        // await tab.click("br[data-text=true]");
        await tab.waitForSelector("br[data-text=true]");
        await tab.type("br[data-text=true]", " ");
        await tab.type("span[data-text=true]", headline);
        let drop = await tab.$("._3jk input[type=file]")
        await drop.uploadFile(news[i].img);

        await tab.click("span[data-text=true]", { delay: 3000 })

        await tab.waitForSelector("._45wg._69yt button[type=submit]");
        await tab.click("._45wg._69yt button[type=submit]", { delay: 3000 });

        await tab.waitFor(() => !document.querySelector("._45wg._69yt button[type=submit]"));
    }

}
