let fs=require("fs");

let f2=fs.promises.readFile("f2.html");
let f3=fs.promises.readFile("f3.txt");
let f1=fs.promises.readFile("f1.html");

f3.then(function(file){
    console.log("f3 is read"+file.byteLength);
   // let f3=fs.promises.readFile("f3.html");
    
})

f1.then(function(data){
    console.log("f1 is read"+data.byteLength);
    
})
f2.then(function(f2data){
    console.log("f2 is read"+f2data.length);
    
})
