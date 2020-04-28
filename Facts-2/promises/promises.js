let fs=require("fs");
let f2=fs.promises.readFile("f2.html");
console.log(f2);
f2.then(function(data){
    console.log(data.length  );
    
})
f2.catch(function(err){
    console.log(err);
    
})