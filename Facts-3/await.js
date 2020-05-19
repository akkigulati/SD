let fs=require("fs");

(async function(){
let f1=await fs.promises.readFile("f1.html","UTF-8");
console.log("f1 is read..."+f1.length);
})()