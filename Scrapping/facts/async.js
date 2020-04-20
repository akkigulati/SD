let fs=require('fs');
console.log("Before");
//work started.
fs.readFile("h1.html",function(err,content){
    console.log("content:"+content);
});
//move on to other part of code
//jab kaam hoga apne aap display kr dega async function.

console.log("end");
