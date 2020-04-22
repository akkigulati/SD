let fs=require("fs");
console.log("before");
console.log("start");
let fileWillBeReadPromise=fs.promises.readFile("f1.html");
fileWillBeReadPromise.then(function(content)
{
    console.log(content+" ");
    //to handle buffer
    console.log("finish");
})
fileWillBeReadPromise.catch(function(err)
{
    console.log(err);
})
console.log("after");