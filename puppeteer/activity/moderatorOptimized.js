let puppeteer = require("puppeteer");
let fs = require("fs");
(async function () {
    try{
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 100,
        args: ["--start-maximized"]
    })

tabs = await browser.pages();
let tab = tabs[0];
let credentialsFile = await fs.promises.readFile("Credentials.json");
let { user, pass, url } = JSON.parse(credentialsFile);
await tab.goto(url, { waituntil: "networkidle0" });
await tab.waitForSelector("#input-1", { visible: true })

await tab.type("#input-1", user,{delay:50});
await tab.type("#input-2", pass,{delay:50});
await Promise.all([tab.click("button[data-analytics=LoginPassword]"), tab.waitForNavigation({ waitUntil: "networkidle0" })])
//////////Dashboard///////
await tab.waitForSelector("a[data-analytics=NavBarProfileDropDown]",{visible:true});
await tab.click("a[data-analytics=NavBarProfileDropDown]");
await Promise.all(
    [tab.waitForNavigation({ waitUntil: "networkidle0" }),
    tab.click("a[data-analytics=NavBarProfileDropDownAdministration]"),])
//////////////////Admin page 
//await Loader(page);
await tab.waitForSelector(".administration header", { visible: true })
    let mTabs = await tab.$$(".administration header ul li a");
    // admin page
    //  url => manage contest
    // url => manage challenges
    await Promise.all(
      [tab.waitForNavigation({ waitUntil: "networkidle0" }),
      mTabs[1].click("a[data-analytics=NavBarProfileDropDownAdministration]"),])
    //  getqELement(qidx)=> n number of question, p number of pages
    await handleSinglePageQuestion(tab, browser);
  } catch (err) {
    console.log(err);
  }
})()


async function handleSinglePageQuestion(tab, browser) {
    await tab.waitForSelector(".backbone.block-center");
    let qPage = await tab.$$(".backbone.block-center");
    let pArr = [];

    for (let i = 0; i < qPage.length; i++) {
        let href = await tab.evaluate(function (el) {
            return el.getAttribute("href");
        }, qPage[i]);

        let newTab = await browser.newPage();
        let mwillpromisesenttoques = handleSingleQues(newTab, "https://www.hackerrank.com" + href);
        pArr.push(mwillpromisesenttoques);
    }
    await Promise.all(pArr);
    await tab.waitForSelector(".pagination ul li", { visible: true });

    let PaginationBtn = await tab.$$(".pagination ul li");
    let nxtBtn = PaginationBtn[PaginationBtn.length - 2];

    let className = await tab.evaluate(function (el) {
        return el.getAttribute("class");
    }, nxtBtn);
    if(className=="disables"){
        return;
    }else{
        await Promise.all([nxtBtn.click(),tab.waitForNavigation({waituntil : "networkidle0"})]);
        await handleSinglePageQuestion(tab,browser);
    }
}
async function handleSingleQues(newTab,link){
    await newTab.goto(link,{waituntil : "networkidle0"});
    await newTab.waitForSelector(".tag");
    await newTab.click("li[data-tab=moderators]");
    await newTab.waitForSelector("input[id=moderator]",{visible:true});
    await newTab.type("#moderator","riarawal99");
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
}