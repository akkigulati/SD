require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");

let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let credentialFile = process.argv[2];
let questionsFile = process.argv[3];

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
        let questions = require(questionsFile);

        for(let i=0;i<10;i++){
             (await driver).get(ManageChallengePage);
             await waitForLoader();
             await createNewChallenge(questions[i])
          //  createTestCase(questions[i]);
        }

        
        // driver.close()
    } catch (err) {
        console.log(err);

    }
})()

async function createNewChallenge(question) {
    let createChallenge = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
    await createChallenge.click();
    await waitForLoader();
    // opertion => selection ,data entry

    let eSelector = ["#name", "textarea.description", "#problem_statement-container .CodeMirror div textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];
    
    // elementwillBefoundpromise
    // let AllSelectors = [];
    // for (let i = 0; i < eSelector.length; i++) {
    //   let elemWillBeFoundPromise =driver.findElement(swd.By.css(eSelector[i]));
    //   AllSelectors.push(elemWillBeFoundPromise);
    // }

    let eWillBeselectedPromise = eSelector.map(function (s) {
        return driver.findElement(swd.By.css(s));
    })
    let AllElements = await Promise.all(eWillBeselectedPromise);
    // submit name ,description
    let NameWillAddedPromise = AllElements[0].sendKeys(question["Challenge Name"]);
    let descWillAddedPromise = AllElements[1].sendKeys(question["Description"]);

    await Promise.all([NameWillAddedPromise, descWillAddedPromise]);
    // console.log("name and desc added");
    // code editor
    await editorHandler("#problem_statement-container .CodeMirror div", AllElements[2], question["Problem Statement"]);
    await editorHandler("#input_format-container .CodeMirror div", AllElements[3], question["Input Format"]);
    await editorHandler("#constraints-container .CodeMirror div", AllElements[4], question["Constraints"]);
    await editorHandler("#output_format-container .CodeMirror div", AllElements[5], question["Output Format"]);
    // tags
    let TagsInput = AllElements[6];
    await TagsInput.sendKeys(question["Tags"]);
    await TagsInput.sendKeys(swd.Key.ENTER);
    // submit 
    let submitBtn = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"))
    await submitBtn.click();

}
async function createTestCase(question){
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
