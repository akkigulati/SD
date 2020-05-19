let fs=require("fs");

(async function(){
let f1= fs.promises.readFile("f1.html","UTF-8");
let f2= fs.promises.readFile("f2.html","UTF-8");
let f3= fs.promises.readFile("f3.html","UTF-8");
f1=await f1;
console.log("f1 is read..."+f1.length);
f2=await f2;
console.log("f2 is read..."+f2.length);
f3=await f3;
console.log("f3 is read..."+f3.length);
})()