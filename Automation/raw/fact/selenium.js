require("chromedriver")
let swd=require("selenium-webdriver");
let bldr=new swd.Builder();
let driver=bldr.forBrowser("chrome").build();
driver.get("https://pepcoding.com/login")
.then(function()
{
    console.log("kuch ni hua");
let emailWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=email]"));
return emailWillBeSelectedPromise;
})
.then(function(emailElement)
{
    let abracadabraWillBeSelectedPromise=emailElement.sendKeys("abracadabra");
    return abracadabraWillBeSelectedPromise;
})
.then(function()
{console.log("email has been sent");
let passwordWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=password]"));
return passwordWillBeSelectedPromise;
})
.then(function(passwordElement)
{
    let passwordWillBeEnteredPromise=emailElement.sendKeys("abracadabra");
    return passwordWillBeEnteredPromise;
})
.catch(function(err)
{
    console.log(err);
})


