require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");

let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let credentialFile = process.argv[2];
let moderatorid = process.argv[3];

//let useradd=process.argv[3];

(async function () {

    //console.log("we have logged in");
    //going to administrator
    try {
        await loginHelper();
        //let adminButton = (await driver).findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))

        //let adminButtonurl = await adminButton.getAttribute("href");
        //driver.get(adminButtonurl);
        //switching tabs in adminstrator page
        //  let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"));
        //await manageTabs[1].click();
        //console.log("reached Admin!!");

        // ************************dashboard**********************************

        let DropDownBtn = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
        await DropDownBtn.click();
        let adminLinkanchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"));
        await adminLinkanchor.click();

        // loaders=> 
        // ***************************************Manage challenges******************************************
        // let adminPageUrl = await adminLinkanchor.getAttribute("href");
        // await driver.get(adminPageUrl);
        // stale element => selected elements were in the page but they are not currently here

        await waitForLoader();

        let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"));
        await manageTabs[1].click();
        let ManageChallengePage = await driver.getCurrentUrl();
        
        // let questions = require(questionsFile);
        let questions = await driver.findElements(swd.By.css(".table-body.mlB.text-center a"));
        let pagination= (await driver).findElements(swd.By.css(".pagination ul li"));
        let pageLength=(await pagination).length;
        pageLength=pageLength-2;
        let ipage=3;
        console.log(pageLength);
        for (let i = 0; i < questions.length; i++) {
           // console.log(questions.length);
            console.log(i);
            
            (await driver).get(ManageChallengePage);
            await waitForLoader();
            let question = await driver.findElements(swd.By.css(".table-body.mlB.text-center a"));
            //let question = await driver.findElements(swd.By.css(".table-body.mlB.text-center a"));
            //console.log(await questions[i].getText());
         //   console.log(question);
            
            let link = await question[i].getAttribute("href");
            //console.log(link);
            
            await Addmoderator(link, i)
            if(i==questions.length-1&&ipage<=pageLength-1){
                    (await driver).get(ManageChallengePage);
                     pagination= (await driver).findElements(swd.By.css(".pagination .backbone"));
                   // pagination=pagination[4];
                    pagination= await pagination;
                   ipage++;
                    
                    console.log((await pagination).length);
                    link=(await pagination[2].getAttribute("href"));
                     
                  //  console.log(link);
                    (await driver).get(link);
                    await waitForLoader();
                   // await link.click();
                    questions = await driver.findElements(swd.By.css(".table-body.mlB.text-center a"));
                    i=-1;
                    ManageChallengePage = await driver.getCurrentUrl();
                    console.log(ManageChallengePage);
                
            }
            //   await createNewChallenge(questions[i])
            //  createTestCase(questions[i]);
        }


        // driver.close()
    } catch (err) {
        console.log(err);

    }
})()

async function Addmoderator(url, id) {
    //console.log(url);
    
    (await driver).get(url);

    await waitForLoader();
   
    await driver.wait(swd.until.elementsLocated(swd.By.css("span.tag")));
    
    let moderatorTab = await driver.findElement(swd.By.css("li[data-tab=moderators]"));
  //  console.log(moderatorTab);
    
    await moderatorTab.click();
    
    let text = await driver.findElement(swd.By.css("input[id=moderator]"));

    await text.sendKeys(moderatorid);
    let add = await driver.findElement(swd.By.css(".btn.moderator-save"));
    await add.click();
    let sub = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"));
    
    await sub.click();

}
async function createTestCase(question) {
    let testtab = await driver.findElement(swd.By.css("li[data-tab=testcases]"));
    await testtab.click();
    let addtest = await driver.findElement(swd.By.css(".btn.add-testcase.btn-green"));
    await addtest.click();

}
async function loginHelper() {

    await driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 10000

    })

    let data = await fs.promises.readFile(credentialFile);
    let { user, pass, url } = JSON.parse(data);
    let HackWillBeOpened = await driver.get(url)
    //login part
    let emailWillbeSelectedPromise = driver.findElement(swd.By.css("#input-1")); //[] => this signify attribute.
    let passwordWillbeSelectedPromise = driver.findElement(swd.By.css("#input-2"));
    let waitforpromise = await Promise.all([emailWillbeSelectedPromise, passwordWillbeSelectedPromise]);
    //sending credentials
    let emailWillbewrittenPromise = waitforpromise[0].sendKeys(user);
    let passwordWillbewrittenPromise = waitforpromise[1].sendKeys(pass);
    let waitforcredentialsWritten = await Promise.all([emailWillbewrittenPromise, passwordWillbewrittenPromise]);
    //clicking on login
    let loginbutton = driver.findElement(swd.By.css("button[type=submit]"));
    await loginbutton.click();

}
async function waitForLoader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}
async function editorHandler(parentSelector, element, data) {
    let parent = await driver.findElement(swd.By.css(parentSelector));
    // selenium => browser js execute 
    await driver.executeScript("arguments[0].style.height='10px'", parent);
    await element.sendKeys(data);
}
