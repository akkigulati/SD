let fs=require("fs");
let f2=fs.promises.readFile("f21.html");
console.log(f2);
f2.then(function(data){
    console.log("scb");
    console.log(data.length  );
    
}).then(function(data){
    console.log(data);
    
}).catch(function(){
    console.log("i saved the day");
    console.log(err);
    
    
})
