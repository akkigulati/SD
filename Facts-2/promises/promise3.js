let fs=require("fs");
let f2=fs.promises.readFile("f21.html");
console.log(f2);
//failure callback ni mila isliye err pass krdia
f2.then(function(data){
    console.log("scb");
    console.log(data.length  );
    //failure callback ni mila isliye err pass krdia

}).then(function(data){
    console.log(data);
    //failure callback milgya

}).then(undefined,function(){
    console.log("i saved the day");
    console.log(err);
    
    
})
//last wala then hi catch hai promise 4 dekho