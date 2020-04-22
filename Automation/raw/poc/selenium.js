// search for email-box
//input email
//search for password box
//input password
//search for sign-in button
//click sig-in
require("chromedriver")

let swd = require("selenium-webdriver");

let fs = require("fs")

let credentialsFile = process.argv[2]
let username, password;
//browser build
let metadataFile=process.argv[3];
let courseName=process.argv[4];
let bldr = new swd.Builder()

//tab

let driver = bldr.forBrowser("chrome").build();

let credentialsWillBeReadPromise = fs.promises.readFile(credentialsFile);
credentialsWillBeReadPromise.then(function (credentials) {
    credentials = JSON.parse(credentials);
    username = credentials.username;
    password = credentials.password;
    let pepWillBeOpened = driver.get("https://www.pepcoding.com/login")
    return pepWillBeOpened;
}).then(function () {
    // here ".then" are aligned one after another until first ".then" finishes its promise second ".then" will not be executed.

    //search email

    let emailWillbeSelectedPromise = driver.findElement(swd.By.css("input[type=email")) //[] => this signify attribute.
    let passwordWillbeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"))
    let combinePromise = Promise.all([emailWillbeSelectedPromise, passwordWillbeSelectedPromise]);
    return combinePromise;

}).then(function (Elementarr) {

    //Fill emaid-field

    let whatsupWillbeSendPromise = Elementarr[0].sendKeys(username);
    let passwordWillBeenteredPromise = Elementarr[1].sendKeys(password)
    let combinePromise = Promise.all([whatsupWillbeSendPromise, passwordWillBeenteredPromise]);
    return combinePromise;


}).then(function () {

    let SubmitButtonWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"))

    return SubmitButtonWillBeSelectedPromise

}).then(function (submitElement) {

    let submitButtonwillBeClicked = submitElement.click()

    return submitButtonwillBeClicked

}).then(function () {
    //resouce card select & click
    let resourceCardWillBeSelected = driver.findElement(swd.By.css(".resource a"));
    return resourceCardWillBeSelected;

}).then(function (resoucePageAnchor) {
    let resourcePageLink = resoucePageAnchor.getAttribute("href");
    return resourcePageLink;
}).then(function (resourcelink) {
    let navigateResourceLink = driver.get(resourcelink);
    return navigateResourceLink;
}).then(function () {
    //resouce card select & click
    let siteOverlayElement = driver.findElement(swd.By.css("#siteOverlay"));
    return siteOverlayElement;
}).then(function (soe) {
    //resource page consist an overlay element for which we have to wait.
    let wait = driver.wait(swd.until.elementIsNotVisible(soe), 1000);
    return wait;
}).then(function () {
    let courseWillBeLocated=driver.findElement(swd.By.css("#courseCard40"));
    return courseWillBeLocated;
}).then(function(courseLink){
    let navigateCourseLink = courseLink.click();
    return navigateCourseLink;
}).then(function(){
    let lisTabToBeLocatedPromise=driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 10000);
    return lisTabToBeLocatedPromise;

}).then(function(){    
    let lisTabtobeFoundPromise=driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")),1000)
     return lisTabtobeFoundPromise

}).then(function(){
let ModuleWillbe=driver.findElements(swd.By.css(".lis.tab"));
return ModuleWillbe;
}).then(function(modules){
gModules=modules;
console.log(modules.length);
let moduleTextPromiseArr=[];
for(let i=0;i<modules.length;i++){
    let modulesNamePromise=modules[i].getText();
    moduleTextPromiseArr.push(modulesNamePromise);
}
let allmodulespromise=Promise.all(moduleTextPromiseArr);
return allmodulespromise;
}).then(function (AllModulesText) {
    let i;
    for (i = 0; i < AllModulesText.length; i++) {
      if (AllModulesText[i].includes("Recursion") == true) {
        break;
      }
    }
    let moduleWillBeclickedPromise = gModules[i].click();
    return moduleWillBeclickedPromise;
  }).then(function(){
    let LectureWillbePromised=driver.findElements(swd.By.css("#module2 p"));
    return LectureWillbePromised;
  }).then(function(lectures){
      console.log(lectures.length);
      glectures=lectures;
      let lecturesPromiseArr=[];
      for(let i=0;i<lectures.length;i++){
          lecturesPromiseArr.push(lectures[i].getText());
      }
      let alllecturesPromise=Promise.all(lecturesPromiseArr);
      return alllecturesPromise;
      
  }).then(function(lectures){
    // console.log(lectures);
    //let metad=metadataFile
    let i=0;
    for(i=0;i<lectures.length;i++){
        if (lectures[i].includes("Recursion in Arrays") == true) {
            break;
          }
    }
     let LectureWillbeClickedPromise=glectures[i].click();
     return LectureWillbeClickedPromise;
  }).then(function(){
      let questionWillBeSelectedpromise=driver.findElements(swd.By.css(".collection.resourceList li p"));
      return questionWillBeSelectedpromise;
  }).then(function(questions){
  //  console.log(questions.length);
    gquestions=questions;
    let questionsPromiseArr=[];
    for(let i=0;i<questions.length;i++){
        questionsPromiseArr.push(questions[i].getText());
    }
    let allquestionsPromise=Promise.all(questionsPromiseArr);
    return allquestionsPromise;
    
}).then(function(questions){
  // console.log(lectures);
  //let metad=metadataFile
  let i=0;
  for(i=0;i<questions.length;i++){
      if (questions[i].includes("First Index") == true) {
          break;
        }
  }
   let questionWillbeClickedPromise=gquestions[i].click();
   return questionWillbeClickedPromise
}).then(function(){
    console.log("question clicked");
    
})
.catch(function (err) {

    console.log(err);



})

