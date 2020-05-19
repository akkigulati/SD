let puppeteer = require("puppeteer");
let fs = require("fs");
(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 100,
        args: ["--incognito", "--start-maximized"]
    });

    pages = await browser.pages();
    let page = pages[0];
    let credentialsFile = await fs.promises.readFile("Credentials.json");
    let { user, pass, url } = JSON.parse(credentialsFile);
    await page.goto(url, { waituntil: "networkidle0" });
    await page.type("#input-1", user);
    await page.type("#input-2", pass);
    await page.click("button[data-analytics=LoginPassword]", { waituntil: "networkidle0" });
    //////////Dashboard///////
    await page.waitForSelector("a[data-analytics=NavBarProfileDropDown]");
    await page.click("a[data-analytics=NavBarProfileDropDown]");
    await page.click("a[data-analytics=NavBarProfileDropDownAdministration]");
    //////////////////Admin page 
    //await Loader(page);
    await page.waitForSelector(".administration header", { visible: true })

    let tabs = await page.$$(".administration header ul li a");
    let href = await page.evaluate(function (el) {
        return el.getAttribute("href");
      }, tabs[1])
      let mpurl = "https://www.hackerrank.com" + href;
      // console.log("Line number number " + mpUrl);
      await page.goto(mpurl, { waitUntil: "networkidle0" });
      // get question
    
    //let mpurl = await page.url();
    let qidx = 0;
    console.log(mpurl);
    
    while (true) {
        let question = await getMeQuestionEle(page, qidx, mpurl);
    
    if (question == null) {
        console.log("All questions Are processed");
        return;

    }
    await handleQuestion(page, question, process.argv[3]);
    qidx++;    
}
    
})();
async function getMeQuestionEle(page, idx, url) {
    let pageidx = Math.floor(idx / 10);
    let pqidx = idx % 10;
    //page visit
    console.log(pageidx+" "+pqidx);
    
    await page.goto(url);
   // await page.waitForNavigation({ waitUntil: "networkidle0" });
   //await Loader(page);

  //  await page.waituntil("networkidle02");
    await page.waitForSelector(".pagination ul li",{visible:true});

    let pagination = await page.$$(".pagination ul li");
    
    let nxtBtn = pagination[pagination.length - 2];

    let className = await page.evaluate(function (el) {
        return el.getAttribute("class");
    }, nxtBtn);

    for (let i = 0; i < pageidx; i++) {
        if (className == "disabled") {
            return null;
        }
        await nxtBtn.click();
        await page.waitForSelector(".pagination ul li",{visible:true});

        pagination = await page.$$(".pagination ul li");
        nxtBtn = pagination[pagination.length - 2];

        className = await page.evaluate(function (el) {
            return el.getAttribute("class")
        }, nxtBtn);
    
    }
    let challengeL = await page.$$(".backbone.block-center");
    if(challengeL.length>pqidx){
        return challengeL[pqidx];
    }else{
        return null;
    }
}
//async function Loader(page) {
  //  await page.waitForSelector("#ajax-msg", {
    //    visible: false
   // })
//}
async function handleQuestion(page, question, uToAdd) {
    // let qUrl = await page.evaluate(function (el) {
    //   return el.getAttribute("href");
    // }, question);
    // console.log(qUrl);
    // await page.goto(qUrl);
    
    //  backend data 
    // await waitForLoader(page);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), question.click()]);
    await page.waitForSelector("li[data-tab=moderators]", { visible: true })
    await page.click("li[data-tab=moderators]");
    await page.waitForSelector("input[id=moderator]", { visible: true });
    await page.type("#moderator", uToAdd);
    await page.keyboard.press("Enter");
    await page.click(".save-challenge.btn.btn-green")
  }