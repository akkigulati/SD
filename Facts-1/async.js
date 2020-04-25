let fs=require("fs");
console.log("started execution file");
console.log("Cpu is stuck till file is read");

fs.readFile("f1.html",'utf8',function(err,data){
    console.log(data);
    
})
console.log("cpu is free now");
console.log("Now i can print ");


