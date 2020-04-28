let fs=require("fs");
let f2=fs.promises.readFile("f21.html");
console.log(f2);
//error aya to fcb chlega or value pass hojaegi
//error ni to scb or value pass hojaegi
f2.then(function(data){
    console.log("scb");
    console.log(data.length  );
    
},function(){
    console.log("fcb");
    
}).then(function(data){
    console.log(data);
    
})
