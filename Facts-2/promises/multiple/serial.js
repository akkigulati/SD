let fs=require("fs");

let f1=fs.promises.readFile("f1.html");
f1.then(function(data){
    console.log("f1 is read"+data.byteLength);
    let f2=fs.promises.readFile("f2.html");
    return f2;
}).then(function(data){
    console.log("f2 is read"+data.byteLength);
    let f3=fs.promises.readFile("f3.txt");
    return f3;
}).then(function(data){
    console.log("f3 is read"+data.byteLength);
   // let f3=fs.promises.readFile("f3.html");
    //return f3;
}).catch(function(err){
    console.log(err);
    
})