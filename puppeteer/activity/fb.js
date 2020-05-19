let puppeteer = require("puppeteer");
let fs = require("fs");
let nPost = process.argv[4];
(async function(){
    try {
        let credentialsFile = await fs.promises.readFile("FbCredential.json");
        let { user, pass, url } = JSON.parse(credentialsFile);
    
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            slowMo: 100,
            args: ["--start-maximized", "--disable-notifications"]
        })
   
    let pUrl=process.argv[3];
    tabs = await browser.pages();
    let tab = tabs[0];

    await tab.goto(url, { waituntil: "networkidle2" });
    await tab.waitForSelector("input[type=email]");
    await tab.type("input[type=email]", user, { delay: 120 });
    await tab.type("input[type=password]", pass, { delay: 120 });
    //login button
    await Promise.all([
        tab.click(".login_form_login_button"), tab.waitForNavigation({
            waitUntil: "networkidle2"
        })
    ])
    await tab.goto(pUrl, { waitUntil: "networkidle2" });
    await tab.waitForSelector("div[data-key=tab_posts]");
    //  post => click => reroute=> 2 times=> 2 times (wait for navigation)
    await Promise.all([
        tab.click("div[data-key=tab_posts]"),
        tab.waitForNavigation({ waitUntil: "networkidle2" })
    ])
    await tab.waitForNavigation({ waitUntil: "networkidle2" });

    let idx = 0;
    do {
        //  post => 7 post => are loaded 
        await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
        // children selector

        let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8")
        // saftey
        // console.log(elements.length);
        let post = elements[idx];
        // like -> selector
        await tab.waitForSelector("._666k ._8c74");
        let like = await post.$("._666k ._8c74");
        await like.click({ delay: 100 });
        console.log(idx);
        idx++;
        await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
        //  wait for loader => visible => content load =>
        // hidden=> may post => wait for loader 
        //  loader  hide wait 
        // immediate child
        
        //  descendent 
    } while (idx < nPost)

}
catch (err) {
    console.log(err);

}
})();